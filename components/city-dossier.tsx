import Image from "next/image";
import Link from "@/components/market-link";
import { Breadcrumbs, ImageCredits, JsonLd, breadcrumbJsonLd } from "@/components/ui";
import { getCities, getPage, imageCredits, pageRegistrationUrl, renderedContentHtml, type PublicPage } from "@/lib/content";
import { nearestCities } from "@/lib/city-geo";
import { profileGuide, sourceNumber, splitGuide, type CityProfile, type Metric, type Place } from "@/lib/city-profile";
import { requestMarket } from "@/lib/market-context";
import { getMarket, marketOrigin } from "@/lib/markets";
import { citySearchUrl, trustLinks } from "@/lib/site";
import styles from "./city-dossier.module.css";

type Crumb = { name: string; href: string };

const CHAPTER_ICONS: Record<string, React.ReactNode> = {
  bildung: <path d="M3 9l9-5 9 5-9 5-9-5zm3 2.2V16c0 1.6 2.7 3 6 3s6-1.4 6-3v-4.8M21 9v6" />,
  beruf: <path d="M4 8h16v11H4zM9 8V5h6v3M4 13h16" />,
  forschung: <path d="M9 3h6M10 3v5.2L5.6 17a2.4 2.4 0 002.1 3.6h8.6a2.4 2.4 0 002.1-3.6L14 8.2V3M7.4 14h9.2" />,
  einkommen: <path d="M12 3v18M8.5 7.5h5a2.5 2.5 0 010 5h-3a2.5 2.5 0 000 5h5" />,
  wohnen: <path d="M4 11l8-6 8 6M6 10.5V20h12v-9.5M10 20v-5h4v5" />,
  singles: <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" />,
};

function Icon({ children }: { children: React.ReactNode }) {
  return <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>;
}

function SourceRef({ profile, id }: { profile: CityProfile; id: string }) {
  const n = sourceNumber(profile, id);
  return <a className={styles.ref} href={`#quelle-${n}`} aria-label={`Quelle ${n}`}>{n}</a>;
}

function CompareBars({ metric, city, profile }: { metric: Metric; city: string; profile: CityProfile }) {
  const c = metric.compare;
  if (!c) return null;
  const max = c.max ?? Math.max(c.city, c.germany) * 1.15;
  const fmt = (v: number) => `${v.toLocaleString("de-DE")}${c.unit}`;
  const left = c.cityLabel ?? city;
  const right = c.compareLabel ?? profile.country ?? "Deutschland";
  return <div className={styles.bars} role="img" aria-label={`${left} ${fmt(c.city)}, ${right} ${fmt(c.germany)}`}>
    <div><span>{left}</span><i style={{ width: `${(c.city / max) * 100}%` }} /><span className={styles.value}>{fmt(c.city)}</span></div>
    <div className={styles.barDe}><span>{right}{metric.compareSource ? <SourceRef profile={profile} id={metric.compareSource} /> : null}</span><i style={{ width: `${(c.germany / max) * 100}%` }} /><span className={styles.value}>{fmt(c.germany)}</span></div>
  </div>;
}

function MetricBlock({ metric, profile, city }: { metric: Metric; profile: CityProfile; city: string }) {
  return <div className={styles.metric}>
    <span className={`display ${styles.value}`}>{metric.value}<SourceRef profile={profile} id={metric.source} />{metric.compareSource && !metric.compare ? <SourceRef profile={profile} id={metric.compareSource} /> : null}</span>
    <span className={styles.metricLabel}>{metric.label}</span>
    {metric.note ? <span className={styles.metricNote}>{metric.note}</span> : null}
    <CompareBars metric={metric} city={city} profile={profile} />
  </div>;
}

// Vereinfachter Stadtplan: Plattkarte mit cos(Breite)-Stauchung, Gewässer und Parks aus OpenStreetMap (scripts/build_city_map.py).
function project(profile: CityProfile, lat: number, lon: number): [number, number] {
  const { west, east, south, north } = profile.map.bounds;
  const k = 640 / ((east - west) * Math.cos((((north + south) / 2) * Math.PI) / 180));
  const x = (lon - west) * Math.cos((((north + south) / 2) * Math.PI) / 180) * k;
  const y = (north - lat) * k;
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}

function line(profile: CityProfile, points: [number, number][]): string {
  return points.map(([lat, lon], index) => `${index ? "L" : "M"}${project(profile, lat, lon).join(" ")}`).join(" ");
}

type Box = { left: number; right: number; top: number; bottom: number };
const overlaps = (a: Box, b: Box) => a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;

// Pins, die sich überdecken würden, werden auseinandergeschoben; eine feine Linie zeigt die echte Lage.
function layoutPins(profile: CityProfile) {
  const pins = profile.places.map(place => {
    const [x, y] = project(profile, place.lat, place.lon);
    return { x, y, ox: x, oy: y };
  });
  for (let round = 0; round < 40; round++) {
    let moved = false;
    for (let i = 0; i < pins.length; i++) {
      for (let j = i + 1; j < pins.length; j++) {
        const a = pins[i], b = pins[j];
        const dx = b.x - a.x || 0.01, dy = b.y - a.y;
        const distance = Math.hypot(dx, dy);
        if (distance >= 28) continue;
        const push = (28 - distance) / 2 / distance;
        a.x -= dx * push; a.y -= dy * push;
        b.x += dx * push; b.y += dy * push;
        moved = true;
      }
    }
    if (!moved) break;
  }
  return pins.map(pin => ({ ...pin, x: Math.round(pin.x * 10) / 10, y: Math.round(pin.y * 10) / 10 }));
}

// Beschriftungen ohne Kollision: geschätzte Textbreite, Ausweichen nach oben/unten, sonst weglassen.
function layoutLabels(profile: CityProfile, height: number) {
  const pins: Box[] = layoutPins(profile).map(({ x, y }) => ({ left: x - 16, right: x + 16, top: y - 16, bottom: y + 16 }));
  const placed: Box[] = [];
  const result: { text: string; x: number; y: number; district?: boolean }[] = [];
  for (const label of profile.map.labels) {
    const [x0, y0] = project(profile, label.lat, label.lon);
    const width = label.text.length * (label.district ? 8.4 : 9.6) + 6;
    const size = label.district ? 11 : 20;
    for (const dy of [0, -18, 18, -32, 32]) {
      const x = Math.min(Math.max(x0, width / 2 + 6), 634 - width / 2);
      const y = Math.min(Math.max(y0 + dy, size + 4), height - 6);
      const box = { left: x - width / 2, right: x + width / 2, top: y - size, bottom: y + 3 };
      if ([...pins, ...placed].some(other => overlaps(box, other))) continue;
      placed.push(box);
      result.push({ text: label.text, x, y, district: label.district });
      break;
    }
  }
  return result;
}

function CityMap({ profile, city }: { profile: CityProfile; city: string }) {
  const { west, south } = profile.map.bounds;
  const height = Math.round(project(profile, south, west)[1]);
  return <svg className={styles.map} viewBox={`0 0 640 ${height}`} role="img" aria-labelledby="karte-titel">
    <title id="karte-titel">{`Vereinfachter Stadtplan ${city} mit Wissens-, Business- und Date-Adressen`}</title>
    <defs>
      <pattern id="karte-raster" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0v32" fill="none" stroke="rgba(216,192,149,.08)" /></pattern>
    </defs>
    <rect width="640" height={height} fill="url(#karte-raster)" />
    {(profile.map.boundary ?? []).map((ring, index) => <path key={`b${index}`} d={`${line(profile, ring)} Z`} className={styles.boundary} />)}
    {profile.map.areas.filter(area => area.kind === "green").map((area, index) => <path key={`g${index}`} d={`${line(profile, area.points)} Z`} className={styles.green} />)}
    {profile.map.rivers.map((river, index) => <path key={`r${index}`} d={line(profile, river.points)} className={river.major ? styles.river : styles.riverThin} />)}
    {profile.map.areas.filter(area => area.kind === "water").map((area, index) => <path key={`w${index}`} d={`${line(profile, area.points)} Z`} className={styles.lake} />)}
    {layoutLabels(profile, height).map(label => <text key={label.text} x={label.x} y={label.y} textAnchor="middle" className={label.district ? styles.mapDistrict : styles.mapWater}>{label.text}</text>)}
    {layoutPins(profile).map(({ x, y, ox, oy }, index) => {
      const place = profile.places[index];
      const shifted = Math.hypot(x - ox, y - oy) > 2;
      return <a key={place.name} href={`#ort-${index + 1}`} className={place.kind === "work" ? styles.pinWork : styles.pinDate}>
        {shifted ? <><line x1={ox} y1={oy} x2={x} y2={y} className={styles.pinLeader} /><circle cx={ox} cy={oy} r="2.5" className={styles.pinDot} /></> : null}
        <circle cx={x} cy={y} r="13" />
        <text x={x} y={y + 4.5} textAnchor="middle">{index + 1}</text>
      </a>;
    })}
  </svg>;
}

function PlaceItem({ place, index }: { place: Place; index: number }) {
  return <li id={`ort-${index + 1}`} className={place.kind === "work" ? styles.placeWork : styles.placeDate}>
    <span className={styles.placeNo}>{index + 1}</span>
    <div><span className={styles.value}>{place.name}</span><small>{place.district}</small><p>{place.text}</p></div>
  </li>;
}

export function CityDossierTemplate({ page, profile, crumbs }: { page: PublicPage; profile: CityProfile; crumbs: Crumb[] }) {
  const city = page.locationName ?? page.heroTitle;
  const market = getMarket(requestMarket());
  const origin = marketOrigin(market.code);
  const register = pageRegistrationUrl(page);
  const imported = splitGuide(renderedContentHtml(page));
  // DE: Kapitel aus dem ICONY-Text; AT/CH: eigener Stadt-Guide aus dem Dossier.
  const own = profileGuide(profile);
  const guide = own.length ? { ...imported, sections: own } : imported;
  const allCities = getCities();
  const nearest = nearestCities(page.path, allCities.map(item => item.path));
  const farthest = Math.max(...nearest.map(item => item.km), 1);
  // DE: Linkliste aus dem ICONY-Text; AT/CH haben keinen Quelltext und zeigen die nächstgelegenen Städte.
  const related = guide.related.length
    ? guide.related.filter(link => link.href !== "/partnersuche/")
    : nearest.flatMap(item => { const target = getPage(item.path); return target ? [{ href: item.path, label: target.locationName ?? target.heroTitle }] : []; });
  const work = profile.places.filter(place => place.kind === "work").length;
  return <main className={styles.page}>
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [
      breadcrumbJsonLd(crumbs, origin),
      { "@type": "WebPage", name: page.heroTitle, url: page.canonical, description: page.description, inLanguage: market.locale, about: { "@type": "City", name: city } },
      { "@type": "FAQPage", mainEntity: profile.faq.map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
    ] }} />

    <section className={styles.hero}>
      {page.heroImage ? <Image className={styles.heroImage} src={page.heroImage} alt={profile.heroAlt ?? `Stadtansicht ${city} – Partnersuche für Akademiker`} fill priority sizes="100vw" /> : null}
      <div className={`container ${styles.heroInner}`}>
        <div className={styles.heroCopy}>
          <Breadcrumbs items={crumbs} tone="dark" />
          <p className="eyebrow">{profile.eyebrow}</p>
          <h1 className="display">Partnersuche in <em>{city}</em></h1>
          <p className={styles.heroLead}>{profile.lead}</p>
          <div className={styles.heroActions}>
            <a className="btn btn-gold" href={register}>Akademiker in {city} kennenlernen</a>
            <a className="btn btn-ghost" href="#dossier">{city} in Zahlen</a>
          </div>
        </div>
        <aside className={styles.briefing} aria-label={`${city} auf einen Blick`}>
          <p className={styles.briefingHead}><span>Stadtdossier</span><span>{city}</span></p>
          {profile.briefing.map(metric => <div key={metric.label} className={styles.briefingRow}>
            <span className={`display ${styles.value}`}>{metric.value}<SourceRef profile={profile} id={metric.source} /></span>
            <span>{metric.label}</span>
          </div>)}
          <p className={styles.briefingFoot}>Amtliche Statistik · Quellen am Seitenende</p>
        </aside>
      </div>
    </section>

    <section className={`container ${styles.kpis}`} aria-label="Kennzahlen">
      {profile.kpis.map(metric => <div key={metric.label}>
        <span className={`display ${styles.value}`}>{metric.value}<SourceRef profile={profile} id={metric.source} /></span>
        <span>{metric.label}</span>
      </div>)}
    </section>

    <section id="dossier" className={`container ${styles.dossier}`}>
      <header className={styles.sectionHead}>
        <p className="eyebrow">Das Stadtdossier</p>
        <h2 className="display">Warum {city} zu Menschen <em>mit Anspruch</em> passt</h2>
        <p>Bildung, Beruf und Lebensform – drei Blickwinkel auf die Stadt, belegt mit amtlichen Zahlen. Damit Sie wissen, wen Sie hier treffen.</p>
      </header>
      <div className={`${styles.chapters} ${profile.dossier.length === 4 ? styles.chapters4 : ""}`}>
        {profile.dossier.map((chapter, index) => <article key={chapter.key} className={styles.chapter}>
          <header>
            <span className={styles.chapterIcon}><Icon>{CHAPTER_ICONS[chapter.key]}</Icon></span>
            <span className={styles.chapterNo}>{String(index + 1).padStart(2, "0")}</span>
          </header>
          <h3 className="display">{chapter.title}</h3>
          <p className={styles.chapterIntro}>{chapter.intro}</p>
          {chapter.metrics.map(metric => <MetricBlock key={metric.label} metric={metric} profile={profile} city={city} />)}
          <p className={styles.takeaway}><span>Für Ihre Partnersuche</span>{chapter.takeaway}</p>
        </article>)}
      </div>
    </section>


    {profile.universities?.length ? <section id="hochschulen" className={`container ${styles.unis}`}>
      <header className={styles.sectionHead}>
        <p className="eyebrow">Hochschullandschaft</p>
        <h2 className="display">Wer in {city} <em>forscht und lehrt</em></h2>
        {profile.universitiesNote ? <p>{profile.universitiesNote}</p> : null}
      </header>
      <ol className={styles.uniList}>
        {profile.universities.map(item => <li key={item.name}>
          <div className={styles.uniName}>
            <span className={styles.value}>{item.name}</span>
            <small>{item.kind}{item.founded ? ` · gegründet ${item.founded}` : ""}</small>
          </div>
          <div className={styles.uniFacts}>
            {item.students ? <span><i>Studierende</i>{item.students}<SourceRef profile={profile} id={item.source} /></span> : null}
            {item.women ? <span><i>Frauenanteil</i>{item.women}{item.compareSource ? <SourceRef profile={profile} id={item.compareSource} /> : null}</span> : null}
          </div>
          <p>{item.text}</p>
        </li>)}
      </ol>
    </section> : null}
    <section className={styles.mapBand}>
      <div className={`container ${styles.mapInner}`}>
        <div className={styles.mapCopy}>
          <p className="eyebrow">Wo {city} denkt, arbeitet und ausgeht</p>
          <h2 className="display">Vom Campus <em>zum ersten Date</em></h2>
          <p>{work} Adressen, an denen Wissenschaft und Wirtschaft in {city} zu Hause sind – und {profile.places.length - work} Orte, an denen aus einem guten Gespräch ein Abend wird.</p>
          <p className={styles.legend}><span className={styles.legendWork}>Wissen &amp; Beruf</span><span className={styles.legendDate}>Kultur &amp; Dates</span></p>
        </div>
        <div className={styles.mapFrame}>
          <CityMap profile={profile} city={city} />
          <p className={styles.mapNote}>Vereinfachte Karte · Stadtgrenze, Gewässer und Parks © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="nofollow noopener">OpenStreetMap-Mitwirkende</a></p>
        </div>
        <div className={styles.placeGroups}>
          <div><h3>Wissen &amp; Beruf</h3><ol className={styles.places}>{profile.places.map((place, index) => place.kind === "work" ? <PlaceItem key={place.name} place={place} index={index} /> : null)}</ol></div>
          <div><h3>Kultur &amp; Dates</h3><ol className={styles.places}>{profile.places.map((place, index) => place.kind === "date" ? <PlaceItem key={place.name} place={place} index={index} /> : null)}</ol></div>
        </div>
      </div>
    </section>

    <section className={`container ${styles.clusters}`}>
      <header className={styles.sectionHead}>
        <p className="eyebrow">Beruf &amp; Erfolg</p>
        <h2 className="display">Die Branchen, die {city} <em>prägen</em></h2>
        <p>Wer hier Karriere macht, tut das oft in einem dieser Felder – gute Gesprächsthemen fürs erste Date inklusive.{(profile.clusterSources ?? []).map(id => <SourceRef key={id} profile={profile} id={id} />)}</p>
      </header>
      <ul>{profile.clusters.map(cluster => <li key={cluster.name}><span className={`display ${styles.value}`}>{cluster.name}</span><p>{cluster.text}</p></li>)}</ul>
    </section>

    {profile.quarters?.length ? <section className={`container ${styles.quarters}`}>
      <header className={styles.sectionHead}>
        <p className="eyebrow">Wohnen &amp; ausgehen</p>
        <h2 className="display">Die Viertel, in denen {city} <em>zu Hause ist</em></h2>
        <p>Wo Hochschulnahe wohnen, wo abends geredet wird – und was das für ein erstes Treffen bedeutet.{(profile.quarterSources ?? []).map(id => <SourceRef key={id} profile={profile} id={id} />)}</p>
      </header>
      <ul className={styles.quarterList}>
        {profile.quarters.map(quarter => <li key={quarter.name}>
          <span className={styles.quarterLabel}>{quarter.label}</span>
          <span className={`display ${styles.value}`}>{quarter.name}</span>
          <p>{quarter.text}{quarter.source ? <SourceRef profile={profile} id={quarter.source} /> : null}</p>
        </li>)}
      </ul>
    </section> : null}

    {profile.talkingPoints?.length ? <section className={styles.talkBand}>
      <div className={`container ${styles.talkInner}`}>
        <div className={styles.talkCopy}>
          <p className="eyebrow">Gesprächsstoff</p>
          <h2 className="display">Worüber in {city} <em>wirklich geredet wird</em></h2>
          <p>Drei Themen, mit denen Sie hier kein Smalltalk-Risiko eingehen – und bei denen Sie schnell merken, ob es passt.</p>
        </div>
        <ul className={styles.talkList}>
          {profile.talkingPoints.map(point => <li key={point.title}>
            <span className={styles.value}>{point.title}</span>
            <p>{point.text}</p>
          </li>)}
        </ul>
      </div>
    </section> : null}

    {page.cityWidget ? <section className={`container ${styles.widget}`} data-icony-city-widget>
      <div className={styles.widgetCopy}>
        <p className="eyebrow">Gerade aktiv</p>
        <h2 className="display">Akademiker Singles aus <em>{city}</em> und Umgebung</h2>
        <p>Menschen aus Ihrer Region, die Bildung, Erfolg und niveauvolle Gespräche zu schätzen wissen – jedes Profil manuell geprüft.</p>
        <a className="btn btn-dark" href={register}>Jetzt kostenlos kennenlernen</a>
        <a className="btn btn-outline" href={citySearchUrl(page.cityWidget.postcode)}>In {city} und Umgebung suchen</a>
      </div>
      <div className={styles.widgetFrame}>
        <iframe src={page.cityWidget.url} title={`Aktive Akademiker Singles aus ${city} und Umgebung`} width="440" height="300" loading="lazy" referrerPolicy="no-referrer" sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation" />
      </div>
    </section> : null}

    {guide.sections.length || guide.intro ? <section id="guide" className={`container ${styles.guide}`}>
      <aside className={styles.toc}>
        <p className={styles.tocHead}>Stadt-Guide {city}</p>
        <ol>{guide.sections.map((section, index) => <li key={section.id}><a href={`#${section.id}`}><span>{String(index + 1).padStart(2, "0")}</span>{section.title}</a></li>)}</ol>
        <a className="btn btn-gold" href={register}>Kostenlos starten</a>
        <p className={styles.tocNote}>Jedes Profil manuell geprüft · Basis-Mitgliedschaft kostenlos</p>
      </aside>
      <div className={styles.guideMain}>
        {guide.intro ? <div className="prose" dangerouslySetInnerHTML={{ __html: guide.intro }} /> : null}
        {guide.sections.map((section, index) => <article key={section.id} id={section.id} className={styles.guideCard}>
          <span className={styles.guideNo}>{String(index + 1).padStart(2, "0")}</span>
          <h2 className="display">{section.title}</h2>
          <div className="prose" dangerouslySetInnerHTML={{ __html: section.html }} />
        </article>)}
        <ImageCredits credits={imageCredits(page)} />
      </div>
    </section> : null}

    {profile.agenda?.length ? <section className={`container ${styles.agenda}`}>
      <header className={styles.sectionHead}>
        <p className="eyebrow">Termine &amp; Netzwerke</p>
        <h2 className="display">Wo man sich in {city} <em>ohnehin trifft</em></h2>
        <p>Wiederkehrende Veranstaltungen und Netzwerke mit akademischem Publikum – Anlässe, zu denen man auch zu zweit gehen kann.</p>
      </header>
      <ol className={styles.agendaList}>
        {profile.agenda.map(item => <li key={item.title}>
          <span className={styles.agendaWhen}>{item.when}</span>
          <div>
            <span className={styles.value}>{item.href ? <a href={item.href} target="_blank" rel="nofollow noopener">{item.title}</a> : item.title}</span>
            <p>{item.text}</p>
          </div>
        </li>)}
      </ol>
    </section> : null}

    <section className={`container ${styles.faq}`}>
      <header className={styles.sectionHead}>
        <p className="eyebrow">Häufige Fragen</p>
        <h2 className="display">Akademiker Singles in {city}</h2>
      </header>
      <div>{profile.faq.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
    </section>

    <section className={`container ${styles.reach}`} aria-labelledby="in-reichweite">
      <div>
        <p className="eyebrow">Universitätsstädte in Reichweite</p>
        <h2 className="display" id="in-reichweite">Partnersuche über {city} <em>hinaus</em></h2>
        <ul className={styles.distances}>{nearest.map(item => {
          const target = getPage(item.path);
          return target ? <li key={item.path}><Link href={item.path}><span>{target.locationName}</span><i style={{ width: `${(item.km / farthest) * 100}%` }} /><span className={styles.value}>{item.km} km</span></Link></li> : null;
        })}</ul>
        <p className={styles.distanceNote}>Luftlinie ab Stadtmitte</p>
      </div>
      <div>
        <p className={styles.chipsHead}>Diese Städte könnten auch interessant für Sie sein:</p>
        <ul className={styles.chips}>
          {related.map(link => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}
          <li><Link className={styles.chipAll} href="/partnersuche/">Alle Städte →</Link></li>
        </ul>
        <ul className={styles.trust}>{trustLinks().slice(0, 3).map(link => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}</ul>
        {profile.nicheHint ? <p className={styles.trust}>{profile.nicheHint.before}<a href={profile.nicheHint.href} target="_blank" rel="noopener">{profile.nicheHint.anchor}</a>{profile.nicheHint.after}</p> : null}
      </div>
    </section>

    <section className={`container ${styles.sources}`} aria-labelledby="quellen">
      <details>
      <summary id="quellen">Quellen{profile.heroCredit ? " & Bildnachweise" : ""}</summary>
      {profile.heroCredit ? <p>{profile.heroCredit}</p> : null}
      <ol>{profile.sources.map((source, index) => <li key={source.id} id={`quelle-${index + 1}`}>
        {source.publisher}: <a href={source.url} target="_blank" rel="nofollow noopener">{source.title}</a> ({source.stand})
      </li>)}</ol>
      </details>
    </section>

    <section className={styles.cta}>
      <div className="container">
        <p className="eyebrow">Kostenlos starten</p>
        <h2 className="display">Ihr nächstes gutes Gespräch <em>findet in {city} statt</em></h2>
        <p>Profil in wenigen Minuten anlegen, Basis-Mitgliedschaft kostenlos, jedes Profil manuell geprüft.</p>
        <a className="btn btn-gold" href={register}>Singles in {city} kennenlernen</a>
      </div>
    </section>

    <a className={styles.sticky} href={register}>Akademiker in {city} kennenlernen</a>
  </main>;
}
