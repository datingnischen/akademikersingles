"""Öffentlicher Redaktions-Snapshot von akademikersingles.de.

Liest Startseite, Städte-Partnersuche, Ratgeberseiten (ICONY-CMS) und das
WordPress-Magazin, entfernt ausführbares Markup sowie Mitgliederbereiche und
legt erlaubte redaktionelle Grafiken lokal unter public/imported/ ab.
"""
from __future__ import annotations

import hashlib
import html
import io
import ipaddress
import json
import math
import mimetypes
import re
import socket
import time
from pathlib import Path
from urllib.parse import unquote, urljoin, urlparse
from xml.etree import ElementTree as ET

import requests
from bs4 import BeautifulSoup, Comment
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"
ASSET_DIR = ROOT / "public" / "imported"
DOMAIN = "akademikersingles.de"
ORIGIN = f"https://{DOMAIN}"
WP_API = f"{ORIGIN}/magazin/wp-json/wp/v2"
PARTNER_SITEMAP = f"{ORIGIN}/partner_sitemap.php"
CITY_WIDGET_PATTERN = re.compile(r"^https://js\.icony\.com/frame/\?h=300&id=akademikersingles&pc=a7060c&z=([0-9]{5})&ds=&ctr=49&it=1$")

PLATFORM_PATTERNS = [
    re.compile(r"^/(?:registration|login|suche|gutschein|hilfe|kontakt|sitemap)(?:/|$)"),
    re.compile(r"^/(?:fragenflirt|fotoflirt|videodate|videodating|unsere-erfolgsgeschichten|kostenlose-basis-mitgliedschaft|premium-mitgliedschaft|sicherheit-und-datenschutz|redaktionelle-kontrolle|datenschutz|impressum|agb|barrierefreiheit|passwort-senden)\.html/?$"),
]
DROP_SELECTORS = [
    "script", "style", "iframe", "form", "button", "input", "select", "textarea", "noscript", "svg",
    ".grid-view", ".userimage", ".register-box-module", ".registration-form", "#reg-form-panel",
    ".platform-footer", "header", "footer", "nav", ".aioseo-author-bio-compact", ".sharedaddy",
]
ALLOWED_TAGS = {
    "p", "br", "h2", "h3", "h4", "ul", "ol", "li", "strong", "em", "b", "i", "blockquote",
    "a", "img", "audio", "source", "figure", "figcaption", "table", "thead", "tbody", "tr", "th", "td",
}
ALLOWED_ATTRS = {
    "a": {"href", "title", "rel", "target"},
    "img": {"src", "alt", "width", "height", "loading"},
    "audio": {"controls", "preload"},
    "source": {"src", "type"},
    "th": {"scope"}, "td": {"colspan", "rowspan"},
}
USER_MEDIA_HOSTS = {"cdn1.icony-hosting.de", "cdn2.icony-hosting.de", "cdn3.icony-hosting.de"}
APPROVED_ASSET_HOSTS = {"static-cms.icony-hosting.de", "static2.icony-hosting.de", DOMAIN, f"www.{DOMAIN}"}
LOCATION_NAMES = {
    "frankfurt-am-main": "Frankfurt am Main", "freiburg-im-breisgau": "Freiburg im Breisgau",
    "goettingen": "Göttingen", "koeln": "Köln", "muenchen": "München", "muenster": "Münster", "tuebingen": "Tübingen",
}
MAX_IMAGE_WIDTH = 2000
RECOMPRESS_ABOVE_BYTES = 350_000
SESSION = requests.Session()
SESSION.headers.update({"User-Agent": "akademikersingles-migration/1.0 (+public editorial snapshot)"})


def assert_public_https_url(url: str) -> None:
    parsed = urlparse(url)
    host = (parsed.hostname or "").lower()
    if parsed.scheme != "https" or parsed.username or parsed.password or parsed.port not in (None, 443):
        raise RuntimeError(f"Unsafe source URL: {url}")
    if host not in APPROVED_ASSET_HOSTS:
        raise RuntimeError(f"Source host not approved: {host}")
    for result in socket.getaddrinfo(host, 443, type=socket.SOCK_STREAM):
        if not ipaddress.ip_address(result[4][0]).is_global:
            raise RuntimeError(f"Non-public source address rejected for {host}")


def fetch_response(url: str) -> requests.Response:
    current = url
    for _ in range(6):
        assert_public_https_url(current)
        response = SESSION.get(current, timeout=(10, 60), allow_redirects=False)
        if response.is_redirect or response.is_permanent_redirect:
            current = urljoin(current, response.headers["location"])
            continue
        response.raise_for_status()
        if len(response.content) > 20_000_000:
            raise RuntimeError(f"Response too large: {url}")
        return response
    raise RuntimeError(f"Too many redirects: {url}")


def fetch_text(url: str) -> str:
    response = fetch_response(url)
    response.encoding = response.encoding if response.encoding and response.encoding.lower() != "iso-8859-1" else "utf-8"
    return response.text


def fetch_json(url: str):
    return json.loads(fetch_response(url).content.decode("utf-8"))


def text(value: str) -> str:
    return " ".join(html.unescape(BeautifulSoup(value or "", "html.parser").get_text(" ", strip=True)).split())


def normalize_path(url: str) -> str:
    path = unquote(urlparse(url).path or "/")
    return "/" if path in ("", "/") else "/" + path.strip("/") + "/"


def is_platform_path(path: str) -> bool:
    return any(pattern.search(path.rstrip("/") + ("/" if not path.rstrip("/").endswith(".html") else "")) for pattern in PLATFORM_PATTERNS)


def sitemap_urls(url: str) -> list[str]:
    root = ET.fromstring(fetch_text(url))
    return [html.unescape((node.text or "").strip()) for node in root.iter() if node.tag.endswith("loc")]


def family_for(path: str) -> str:
    if path == "/": return "home"
    if path == "/partnersuche/": return "location-hub"
    if path.startswith("/partnersuche/"): return "location"
    if path == "/magazin/": return "magazine-hub"
    if path.startswith("/magazin/category/"): return "magazine-category"
    if path.startswith("/magazin/author/"): return "magazine-author"
    if path.startswith("/magazin/"): return "magazine"
    return "guide"


class Assets:
    def __init__(self) -> None:
        self.records: dict[str, dict] = {}
        self.by_source: dict[str, str] = {}

    def store(self, url: str) -> str | None:
        url = url.strip()
        parsed = urlparse(url)
        host = (parsed.hostname or "").lower()
        if host in USER_MEDIA_HOSTS or "/user-media/" in parsed.path or host not in APPROVED_ASSET_HOSTS:
            return None
        if url in self.by_source:
            return self.by_source[url]
        try:
            data = fetch_response(url).content
        except Exception as error:  # noqa: BLE001 - einzelne tote Grafiken dürfen den Import nicht abbrechen
            print(f"  ASSET FAILED {url}: {error}")
            return None
        source_digest = hashlib.sha256(data).hexdigest()
        ext = Path(unquote(parsed.path)).suffix.lower()
        if ext not in {".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif", ".avif", ".mp3", ".m4a", ".wav", ".ogg"}:
            ext = mimetypes.guess_extension(mimetypes.guess_type(url)[0] or "") or ".bin"
        data, ext = optimize_raster(data, ext)
        digest = hashlib.sha256(data).hexdigest()
        rel = f"/imported/{digest[:20]}{ext}"
        destination = ROOT / "public" / rel.lstrip("/")
        destination.parent.mkdir(parents=True, exist_ok=True)
        if not destination.exists():
            destination.write_bytes(data)
        self.records[rel] = {
            "sourceUrl": url, "localPath": rel, "sha256": digest, "sourceSha256": source_digest, "bytes": len(data),
            "rightsStatus": "legacy-brand-or-editorial-asset; verify provenance before production cutover",
        }
        self.by_source[url] = rel
        return rel


def optimize_raster(data: bytes, ext: str) -> tuple[bytes, str]:
    """Mehrere MB große PNG-Titelbilder werden als hochwertiges JPEG (max. 2000 px breit) abgelegt."""
    if ext not in {".jpg", ".jpeg", ".png"} or len(data) <= RECOMPRESS_ABOVE_BYTES:
        return data, ext
    image = Image.open(io.BytesIO(data))
    if image.mode in ("RGBA", "LA", "P") and image.convert("RGBA").getextrema()[3][0] < 255:
        return data, ext  # echte Transparenz bleibt PNG
    image = image.convert("RGB")
    if image.width > MAX_IMAGE_WIDTH:
        image = image.resize((MAX_IMAGE_WIDTH, round(image.height * MAX_IMAGE_WIDTH / image.width)), Image.LANCZOS)
    buffer = io.BytesIO()
    image.save(buffer, "JPEG", quality=86, optimize=True, progressive=True)
    return (buffer.getvalue(), ".jpg") if buffer.tell() < len(data) else (data, ext)


def largest_src(attrs: dict) -> str:
    """WordPress liefert srcset; die größte Variante ergibt die schärfste Darstellung."""
    srcset = str(attrs.get("srcset") or "")
    best, best_width = str(attrs.get("src") or ""), 0
    for candidate in srcset.split(","):
        parts = candidate.strip().split()
        if len(parts) == 2 and parts[1].endswith("w") and parts[1][:-1].isdigit() and int(parts[1][:-1]) > best_width:
            best, best_width = parts[0], int(parts[1][:-1])
    return best


def clean_content(container, source_url: str, assets: Assets) -> str:
    fragment = BeautifulSoup(str(container), "html.parser")
    for selector in DROP_SELECTORS:
        for node in fragment.select(selector):
            node.decompose()
    for comment in fragment.find_all(string=lambda value: isinstance(value, Comment)):
        comment.extract()
    for node in list(fragment.find_all(True)):
        if node.name == "h1":
            node.decompose()
            continue
        if node.name not in ALLOWED_TAGS:
            node.unwrap()
            continue
        original = dict(node.attrs)
        node.attrs = {key: value for key, value in original.items() if key in ALLOWED_ATTRS.get(node.name, set())}
        if node.name == "a":
            href = str(node.get("href") or "").strip()
            absolute = urljoin(source_url, href) if href else ""
            parsed = urlparse(absolute)
            if parsed.scheme not in {"http", "https"}:
                node.unwrap()
                continue
            node["href"] = absolute
            node.attrs.pop("target", None)
            if (parsed.hostname or "").removeprefix("www.") != DOMAIN:
                node["rel"] = "nofollow noopener"
                node["target"] = "_blank"
        elif node.name == "img":
            local = assets.store(urljoin(source_url, largest_src(original)))
            if local is None:
                node.decompose()
                continue
            node["src"] = local
            node["loading"] = "lazy"
            node["alt"] = " ".join(str(node.get("alt") or "").split())
        elif node.name == "source":
            if node.parent is None or node.parent.name != "audio":
                node.decompose()
                continue
            local = assets.store(urljoin(source_url, str(node.get("src") or "")))
            if local is None:
                node.decompose()
                continue
            node["src"] = local
            node["type"] = str(node.get("type") or "audio/mpeg")
        elif node.name == "audio":
            node["controls"] = ""
            node["preload"] = "none"
    for audio in list(fragment.find_all("audio")):
        if not audio.find("source"):
            audio.decompose()
    for empty in list(fragment.find_all(["p", "h2", "h3", "h4", "li", "figure", "blockquote", "strong", "em", "b", "i"])):
        if not empty.get_text(" ", strip=True) and not empty.find(["img", "audio"]):
            empty.decompose()
    return "\n".join(str(node) for node in fragment.contents if str(node).strip()).strip()


def head_meta(soup: BeautifulSoup) -> tuple[str, str]:
    title = " ".join((soup.title.get_text(" ", strip=True) if soup.title else "").split())
    node = soup.find("meta", attrs={"name": re.compile("^description$", re.I)})
    return title, " ".join(str(node.get("content") or "").split()) if node else ""


def icony_container(soup: BeautifulSoup, path: str):
    if path == "/":
        return soup.select_one("#cms-content")
    main = soup.find("main")
    if main is None:
        return None
    panels = main.select(".panel")
    return max(panels, key=lambda item: len(item.get_text(" ", strip=True)), default=main)


def remove_city_link_lists(fragment_html: str) -> str:
    """Die Stadtliste des Hubs wird als Bildkachel-Raster gerendert, nicht doppelt als Textliste."""
    fragment = BeautifulSoup(fragment_html, "html.parser")
    for listing in fragment.find_all(["ul", "ol"]):
        links = [urlparse(str(a.get("href") or "")).path for a in listing.find_all("a", href=True)]
        if len(links) >= 3 and all(link.startswith("/partnersuche/") and link.rstrip("/") != "/partnersuche" for link in links):
            listing.decompose()
    return str(fragment).strip()


def reading_minutes(content: str) -> int:
    return max(1, math.ceil(len(text(content).split()) / 220))


def import_icony_pages(assets: Assets, skipped: list[dict]) -> list[dict]:
    records = []
    seen = set()
    for url in [f"{ORIGIN}/", *sitemap_urls(PARTNER_SITEMAP)]:
        path = normalize_path(url)
        if path in seen:
            continue
        seen.add(path)
        if is_platform_path(path):
            skipped.append({"path": path, "sourceUrl": url, "owner": "ICONY platform/legal"})
            continue
        try:
            raw = fetch_text(url)
            soup = BeautifulSoup(raw, "html.parser")
            title, description = head_meta(soup)
            h1 = soup.find("h1")
            hero_title = " ".join(h1.get_text(" ", strip=True).split()) if h1 else title.split(" - ")[0]
            container = icony_container(soup, path)
            if container is None:
                raise RuntimeError("No public content container")
            widget = None
            if family_for(path) == "location":
                frame = soup.find("iframe", src=CITY_WIDGET_PATTERN)
                if frame:
                    widget = {"url": frame["src"], "postcode": CITY_WIDGET_PATTERN.match(frame["src"]).group(1)}
            content = clean_content(container, url, assets)
            if path == "/partnersuche/":
                content = remove_city_link_lists(content)
            if len(text(content)) < 80:
                raise RuntimeError("Public content too short after sanitization")
            images = re.findall(r'<img[^>]+src="([^"]+)"', content)
            slug = path.strip("/").split("/")[-1]
            records.append({
                "path": path, "sourceUrl": url, "canonical": f"{ORIGIN}{path}", "family": family_for(path),
                "title": title, "description": description, "heroTitle": hero_title,
                "heroImage": images[0] if images and path != "/" else None,
                "locationName": LOCATION_NAMES.get(slug, slug.replace("-", " ").title()) if family_for(path) == "location" else None,
                "cityWidget": widget, "categories": [], "contentHtml": content,
                "readingMinutes": reading_minutes(content),
            })
            print(f"IMPORTED {path}")
        except Exception as error:  # noqa: BLE001
            skipped.append({"path": path, "sourceUrl": url, "owner": "unresolved", "error": str(error)})
            print(f"SKIPPED {path}: {error}")
        time.sleep(0.05)
    return records


def import_magazine(assets: Assets) -> tuple[list[dict], list[dict]]:
    categories_raw = fetch_json(f"{WP_API}/categories?per_page=100&hide_empty=true")
    categories = sorted(({
        "id": int(c["id"]), "slug": c["slug"], "name": html.unescape(c["name"]), "count": int(c["count"]),
        "description": text(c.get("description", "")), "path": normalize_path(c["link"]),
    } for c in categories_raw if c["slug"] != "allgemein"), key=lambda c: c["id"])
    slug_by_id = {c["id"]: c["slug"] for c in categories}
    posts = fetch_json(f"{WP_API}/posts?per_page=100&_embed=1&status=publish")
    records = []
    for post in posts:
        url = post["link"]
        path = normalize_path(url)
        head = post.get("aioseo_head_json") or {}
        soup = BeautifulSoup(fetch_text(url), "html.parser")
        page_title, page_description = head_meta(soup)
        content = clean_content(BeautifulSoup(post["content"]["rendered"], "html.parser"), url, assets)
        media = (post.get("_embedded", {}).get("wp:featuredmedia") or [{}])[0]
        hero = assets.store(media["source_url"]) if media.get("source_url") else None
        author = (post.get("_embedded", {}).get("author") or [{}])[0]
        records.append({
            "path": path, "sourceUrl": url, "canonical": f"{ORIGIN}{path}", "family": "magazine",
            "title": head.get("title") or page_title, "description": head.get("description") or page_description,
            "heroTitle": text(post["title"]["rendered"]), "heroImage": hero,
            "heroImageAlt": " ".join(str(media.get("alt_text") or "").split()) or text(post["title"]["rendered"]),
            "categories": [slug_by_id[cid] for cid in post["categories"] if cid in slug_by_id],
            "published": post["date"], "modified": post["modified"],
            "author": {"name": author.get("name", "Redaktion"), "path": normalize_path(author.get("link", f"{ORIGIN}/magazin/author/redaktion/"))},
            "excerpt": text(post["excerpt"]["rendered"]).removesuffix("[…]").strip(),
            "contentHtml": content, "readingMinutes": reading_minutes(content),
        })
        print(f"IMPORTED {path}")
        time.sleep(0.05)
    records.sort(key=lambda item: item["published"], reverse=True)

    listing = []
    for path in ["/magazin/", *[c["path"] for c in categories], *sorted({r["author"]["path"] for r in records})]:
        soup = BeautifulSoup(fetch_text(f"{ORIGIN}{path}"), "html.parser")
        title, description = head_meta(soup)
        category = next((c for c in categories if c["path"] == path), None)
        h1 = soup.find("h1")
        listing.append({
            "path": path, "sourceUrl": f"{ORIGIN}{path}", "canonical": f"{ORIGIN}{path}", "family": family_for(path),
            "title": title, "description": description or (category or {}).get("description", ""),
            "heroTitle": category["name"] if category else (" ".join(h1.get_text(" ", strip=True).split()) if h1 else title.split(" - ")[0]),
            "heroImage": None, "categories": [category["slug"]] if category else [], "contentHtml": "",
        })
        print(f"IMPORTED {path}")
    return records + listing, categories


def localize_links(records: list[dict]) -> None:
    """Links auf migrierte Seiten werden relativ, damit Vorschau und Produktion identisch navigieren."""
    migrated = {record["path"] for record in records}

    def replace(match: re.Match) -> str:
        path = normalize_path(match.group(2))
        query = urlparse(match.group(2)).query
        return f'href={match.group(1)}{path}{match.group(1)}' if path in migrated and not query else match.group(0)

    for record in records:
        record["contentHtml"] = re.sub(r'href=(["\'])(https?://(?:www\.)?akademikersingles\.de/[^"\']*)\1', replace, record["contentHtml"])


def main() -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    assets = Assets()
    skipped: list[dict] = []
    records = import_icony_pages(assets, skipped)
    magazine, categories = import_magazine(assets)
    records.extend(magazine)
    localize_links(records)
    records.sort(key=lambda item: item["path"])
    referenced = {ROOT / "public" / path.lstrip("/") for path in assets.records}
    for existing in ASSET_DIR.rglob("*"):
        if existing.is_file() and existing not in referenced:
            existing.unlink()
    dump = lambda name, payload: (DATA_DIR / name).write_text(json.dumps(payload, ensure_ascii=False, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    dump("public-pages.json", {"schemaVersion": 1, "pages": records})
    dump("magazine-categories.json", {"schemaVersion": 1, "categories": categories})
    dump("route-ownership.json", {"migrated": [{"path": r["path"], "owner": "nextjs"} for r in records], "notMigrated": sorted(skipped, key=lambda s: s["path"])})
    dump("asset-provenance.json", sorted(assets.records.values(), key=lambda item: item["localPath"]))
    print(f"PAGES={len(records)} SKIPPED={len(skipped)} ASSETS={len(assets.records)}")


if __name__ == "__main__":
    main()
