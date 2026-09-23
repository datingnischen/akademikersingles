import Link from "next/link";
import { SiteShell } from "@/components/site-shell";

export default function NotFound() {
  return <SiteShell>
    <main className="container" style={{ padding: "clamp(80px, 12vw, 160px) var(--gutter)", textAlign: "center" }}>
      <p className="eyebrow">Seite nicht gefunden</p>
      <h1 className="display" style={{ margin: "0 0 24px", color: "var(--navy-900)", fontSize: "clamp(44px, 6vw, 80px)" }}>Diese Seite gibt es <em>nicht mehr</em>.</h1>
      <p style={{ color: "var(--muted)", marginBottom: 36 }}>Vielleicht finden Sie im Magazin oder in der Partnersuche, wonach Sie suchen.</p>
      <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
        <Link className="btn btn-dark" href="/magazin/">Zum Magazin</Link>
        <Link className="btn btn-outline" href="/partnersuche/">Partnersuche</Link>
      </div>
    </main>
  </SiteShell>;
}
