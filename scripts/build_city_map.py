"""Kartengeometrie für ein Stadtdossier aus OpenStreetMap (Overpass) erzeugen.

python scripts/build_city_map.py hamburg [weitere Städte …]
(AT/CH mit Länderordner: python scripts/build_city_map.py at/wien ch/zuerich)

Liest `mapSpec` aus data/city-profiles/<stadt>.json:
  {"rivers": [{"name": "Elbe", "major": true}], "lakes": ["Außenalster"], "parks": ["Planten un Blomen"]}
und schreibt `map.rivers` (Linien) und `map.areas` (Wasser- und Grünflächen) innerhalb von `map.bounds`.
Linien werden zusammengesetzt und per Douglas-Peucker vereinfacht. Daten © OpenStreetMap-Mitwirkende (ODbL).
"""
import json
import math
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OVERPASS = ["https://overpass-api.de/api/interpreter", "https://overpass.private.coffee/api/interpreter", "https://maps.mail.ru/osm/tools/overpass/api/interpreter"]


def overpass(query: str) -> list:
    data = urllib.parse.urlencode({"data": query}).encode()
    for attempt in range(9):
        try:
            req = urllib.request.Request(OVERPASS[attempt % len(OVERPASS)], data=data, headers={"User-Agent": "datingnischen-akademikersingles/1.0"})
            with urllib.request.urlopen(req, timeout=120) as res:
                return json.load(res)["elements"]
        except Exception as error:  # Overpass drosselt gelegentlich
            print(f"  Overpass-Fehler ({error}), neuer Versuch …")
            time.sleep(5 * (attempt + 1))
    raise RuntimeError("Overpass nicht erreichbar")


def chain(ways: list[list[tuple[float, float]]]) -> list[list[tuple[float, float]]]:
    """Setzt OSM-Wegstücke an gemeinsamen Endpunkten zu langen Linien zusammen."""
    lines = [list(w) for w in ways if len(w) > 1]
    merged = True
    while merged:
        merged = False
        for i in range(len(lines)):
            for j in range(len(lines)):
                if i == j or not lines[i] or not lines[j]:
                    continue
                a, b = lines[i], lines[j]
                if a[-1] == b[0]:
                    lines[i] = a + b[1:]
                elif a[-1] == b[-1]:
                    lines[i] = a + b[::-1][1:]
                elif a[0] == b[-1]:
                    lines[i] = b + a[1:]
                elif a[0] == b[0]:
                    lines[i] = b[::-1] + a[1:]
                else:
                    continue
                lines[j] = []
                merged = True
        lines = [line for line in lines if line]
    return lines


def simplify(points, tolerance, kx):
    if len(points) < 3:
        return points
    (y1, x1), (y2, x2) = points[0], points[-1]
    dx, dy = (x2 - x1) * kx, y2 - y1
    norm = math.hypot(dx, dy) or 1e-12
    best, index = 0.0, 0
    for i in range(1, len(points) - 1):
        y, x = points[i]
        d = abs(dy * (x - x1) * kx - dx * (y - y1)) / norm
        if d > best:
            best, index = d, i
    if best <= tolerance:
        return [points[0], points[-1]]
    return simplify(points[: index + 1], tolerance, kx)[:-1] + simplify(points[index:], tolerance, kx)


def simplify_ring(ring, tolerance, kx):
    """Geschlossene Ringe am entferntesten Punkt teilen, sonst kollabiert Douglas-Peucker."""
    if ring[0] != ring[-1]:
        return simplify(ring, tolerance, kx)
    far = max(range(len(ring)), key=lambda i: math.hypot((ring[i][1] - ring[0][1]) * kx, ring[i][0] - ring[0][0]))
    return simplify(ring[: far + 1], tolerance, kx)[:-1] + simplify(ring[far:], tolerance, kx)


def inside(points, b, margin):
    return any(b["south"] - margin <= lat <= b["north"] + margin and b["west"] - margin <= lon <= b["east"] + margin for lat, lon in points)


def round_points(points):
    return [[round(lat, 5), round(lon, 5)] for lat, lon in points]


def build(slug: str) -> None:
    path = ROOT / "data" / "city-profiles" / f"{slug}.json"
    profile = json.loads(path.read_text(encoding="utf-8"))
    spec = profile.get("mapSpec") or {}
    b = profile["map"]["bounds"]
    bbox = f'{b["south"]},{b["west"]},{b["north"]},{b["east"]}'
    kx = math.cos(math.radians((b["north"] + b["south"]) / 2))
    tolerance = (b["east"] - b["west"]) * kx / 640 * 1.2  # rund 1,2 SVG-Einheiten
    margin = (b["east"] - b["west"]) * 0.15

    rivers = []
    names = "|".join(river["name"] for river in spec.get("rivers", []))
    river_elements = overpass(f'[out:json][timeout:120];way["waterway"~"^(river|canal|stream)$"]["name"~"^({names})$"]({bbox});out geom;') if names else []
    for river in spec.get("rivers", []):
        name = river["name"]
        ways = [[(round(p["lat"], 6), round(p["lon"], 6)) for p in e["geometry"]] for e in river_elements if e.get("geometry") and e.get("tags", {}).get("name") == name]
        for line in chain(ways):
            if not inside(line, b, margin):
                continue
            pts = simplify(line, tolerance, kx)
            if len(pts) >= 2:
                rivers.append({"name": name, "major": bool(river.get("major")), "points": round_points(pts)})
        print(f"  {name}: {len(ways)} Wegstücke")

    areas = []
    green = ['["leisure"~"^(park|garden|nature_reserve)$"]', '["landuse"="forest"]', '["natural"="wood"]']
    for kind, names, filters in (("water", spec.get("lakes", []), ['["natural"="water"]']), ("green", spec.get("parks", []), green)):
        if not names:
            continue
        pattern = "|".join(names)
        union = "".join(f'{kind_}{filt}["name"~"^({pattern})$"]({bbox});' for filt in filters for kind_ in ("way", "relation"))
        found = overpass(f'[out:json][timeout:120];({union});out geom;')
        for name in names:
            elements = [e for e in found if e.get("tags", {}).get("name") == name]
            rings = []
            for e in elements:
                if e["type"] == "way" and e.get("geometry"):
                    rings.append([(p["lat"], p["lon"]) for p in e["geometry"]])
                for member in e.get("members", []):
                    if member.get("role") == "outer" and member.get("geometry"):
                        rings.append([(p["lat"], p["lon"]) for p in member["geometry"]])
            for ring in chain(rings):
                pts = simplify_ring(ring, tolerance * 0.6, kx)
                if len(pts) >= 4:
                    areas.append({"kind": kind, "name": name, "points": round_points(pts)})
            print(f"  {name}: {len(rings)} Ringe")

    profile["map"]["rivers"] = rivers
    profile["map"]["areas"] = areas
    profile["map"].pop("lakes", None)
    with path.open("w", encoding="utf-8", newline="\r\n") as f:
        f.write(json.dumps(profile, ensure_ascii=False, indent=2) + "\n")
    print(f"{slug}: {len(rivers)} Linien, {len(areas)} Flächen")


def build_boundary(slug: str) -> None:
    """Stadtgrenze (administrative Grenze mit `mapSpec.boundary` als Name) als vereinfachte Ringe nach `map.boundary`."""
    path = ROOT / "data" / "city-profiles" / f"{slug}.json"
    profile = json.loads(path.read_text(encoding="utf-8"))
    name = (profile.get("mapSpec") or {}).get("boundary")
    if not name:
        return
    b = profile["map"]["bounds"]
    bbox = f'{b["south"]},{b["west"]},{b["north"]},{b["east"]}'
    kx = math.cos(math.radians((b["north"] + b["south"]) / 2))
    tolerance = (b["east"] - b["west"]) * kx / 640 * 1.5
    found = overpass(f'[out:json][timeout:180];relation["boundary"="administrative"]["admin_level"~"^(4|6|8)$"]["name"="{name}"]({bbox});out geom;')
    if not found:
        print(f"{slug}: keine Grenze „{name}“ gefunden")
        return
    relation = max(found, key=lambda e: int(e["tags"].get("admin_level", "0")))
    rings = [[(p["lat"], p["lon"]) for p in m["geometry"]] for m in relation.get("members", []) if m.get("role") == "outer" and m.get("geometry")]
    boundary = [round_points(simplify_ring(ring, tolerance, kx)) for ring in chain(rings)]
    profile["map"]["boundary"] = [ring for ring in boundary if len(ring) >= 4]
    with path.open("w", encoding="utf-8", newline="\r\n") as f:
        f.write(json.dumps(profile, ensure_ascii=False, indent=2) + "\n")
    print(f"{slug}: Grenze {name} (admin_level {relation['tags'].get('admin_level')}), {len(profile['map']['boundary'])} Ringe, {sum(len(r) for r in profile['map']['boundary'])} Punkte")


if __name__ == "__main__":
    args = sys.argv[1:]
    only_boundary = "--boundary" in args
    for slug in [a for a in args if not a.startswith("--")]:
        if not only_boundary:
            build(slug)
        build_boundary(slug)
