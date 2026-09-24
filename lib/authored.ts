import type { PublicPage } from "@/lib/content";
import { ORIGIN, legacyUrl, registrationUrl } from "@/lib/site";

// Redaktionell neu angelegte Seiten, die es auf der ICONY-Seite nicht gab. Alle Aussagen stützen sich auf
// die Live-Seiten von akademikersingles.de (Startseite, Premium, Sicherheit & Datenschutz) und das Siegel von Singlebörsen-Überblick.

export type FaqLink = { label: string; href: string };
export type FaqItem = { question: string; answer: string[]; links?: FaqLink[] };
export type FaqGroup = { id: string; title: string; items: FaqItem[] };

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "anmeldung",
    title: "Anmeldung & Mitgliedschaft",
    items: [
      {
        question: "Für wen ist AkademikerSingles.de gedacht?",
        answer: [
          "Für gebildete Singles, die eine ernsthafte Beziehung suchen und Wert auf Niveau, gemeinsame Werte und Gespräche auf Augenhöhe legen – Akademikerinnen und Akademiker ebenso wie Unternehmer, Selbstständige und beruflich erfolgreiche Menschen.",
        ],
      },
      {
        question: "Ist die Anmeldung kostenlos?",
        answer: [
          "Ja. Die Registrierung ist kostenfrei und beinhaltet die Basis-Mitgliedschaft. Damit legen Sie Ihr Profil mit Fotos an, nutzen den Fragenflirt, sehen die Matchingfaktoren, empfangen Nachrichten und antworten kostenlos auf Nachrichten von Premium-Mitgliedern.",
        ],
        links: [{ label: "Kostenlos registrieren", href: registrationUrl() }, { label: "Zur Basis-Mitgliedschaft", href: legacyUrl("/kostenlose-basis-mitgliedschaft.html") }],
      },
      {
        question: "Welche Mitgliedschaften gibt es?",
        answer: [
          "Es gibt drei Optionen: die kostenlose Basis-Mitgliedschaft und Premium-Angebote mit unterschiedlichen Laufzeiten. Zu den Premium-Paketen gibt es immer wieder Sonderangebote mit individuellen Laufzeiten.",
        ],
        links: [{ label: "Premium-Mitgliedschaft im Überblick", href: legacyUrl("/premium-mitgliedschaft.html") }],
      },
      {
        question: "Was bietet die Premium-Mitgliedschaft?",
        answer: [
          "Als Premium-Mitglied schreiben Sie unbegrenzt Nachrichten an alle Mitglieder, erhalten Lesebestätigungen, sehen Ihre Profilbesucher und alle Bilder, nutzen das Videodate uneingeschränkt und können sich im privaten Modus unbemerkt umsehen.",
          "Dazu kommen die erweiterte Suche, unbegrenzte Favoriten und die Verifizierung Ihres Profils: Verifizierte Mitglieder erhalten ein auffälliges Symbol und werden anderen zuerst angezeigt.",
        ],
      },
    ],
  },
  {
    id: "kennenlernen",
    title: "Kennenlernen & Funktionen",
    items: [
      {
        question: "Was ist der Fragenflirt?",
        answer: [
          "Beim Fragenflirt bekommen Sie klare Antworten auf direkt formulierte Fragen – eine Pflicht zu antworten besteht nicht. So gewinnen Sie schnell einen Eindruck vom Lebensstil Ihres Gegenübers und schaffen eine Vertrauensbasis für das weitere Gespräch.",
        ],
        links: [{ label: "Mehr zum Fragenflirt", href: legacyUrl("/fragenflirt.html") }],
      },
      {
        question: "Was sagt der Matchingfaktor aus?",
        answer: [
          "Der Matchingfaktor zeigt, wie gut Sie auf Basis Ihrer Angaben mit anderen Singles harmonieren. Je vollständiger Ihr Profil ist, desto aussagekräftiger wird er.",
        ],
      },
      {
        question: "Kann ich jemanden vor dem ersten Treffen per Video kennenlernen?",
        answer: [
          "Ja. Nach einem ersten Fotoflirt können Sie im Videodate prüfen, ob die Chemie stimmt – Premium-Mitglieder nutzen es uneingeschränkt. Ein erstes Gespräch vor dem persönlichen Treffen entscheidet meist schon über die Sympathie.",
        ],
        links: [{ label: "Fotoflirt", href: legacyUrl("/fotoflirt.html") }, { label: "Videodate", href: legacyUrl("/videodate.html") }],
      },
      {
        question: "Wie erhöhe ich meine Chancen?",
        answer: [
          "Vervollständigen Sie Ihr Profil, laden Sie aussagekräftige Bilder hoch und bleiben Sie aktiv – viele Singles schreiben nicht, wenn sie sehen, dass jemand kaum online ist. Premium-Mitglieder erfahren zudem in der Regel einen Vertrauensvorschuss.",
        ],
      },
      {
        question: "Kann ich gezielt Singles in meiner Stadt finden?",
        answer: [
          "Ja. In der Partnersuche nach Städten finden Sie Akademiker Singles in 15 Universitäts- und Wirtschaftsstädten, von Berlin und München bis Heidelberg und Tübingen.",
        ],
        links: [{ label: "Partnersuche nach Städten", href: "/partnersuche/" }],
      },
    ],
  },
  {
    id: "sicherheit",
    title: "Sicherheit & Datenschutz",
    items: [
      {
        question: "Werden die Profile geprüft?",
        answer: [
          "Ja. Jedes neue Profil wird von unserem Team manuell überprüft. Mit dem Check des akademischen Status setzen wir zusätzlich ein Zeichen von Seriosität.",
        ],
        links: [{ label: "Redaktionelle Kontrolle", href: legacyUrl("/redaktionelle-kontrolle.html") }],
      },
      {
        question: "Wie werden meine Daten geschützt?",
        answer: [
          "Unsere Rechenzentren stehen in Deutschland, Login, Nachrichten und Profil laufen über eine verschlüsselte Verbindung (SSL/TLS). Sensible Daten wie E-Mail oder Adresse sind für andere Mitglieder nicht sichtbar, und Profildaten geben wir nicht zu Werbezwecken an Dritte weiter.",
        ],
        links: [{ label: "Sicherheit & Datenschutz", href: legacyUrl("/sicherheit-und-datenschutz.html") }, { label: "Datenschutzerklärung", href: legacyUrl("/datenschutz.html") }],
      },
      {
        question: "Kann ich diskret suchen?",
        answer: [
          "Ja. Absolute Diskretion ist Teil unseres Qualitätsversprechens: Sie bestimmen selbst, was in Ihrem Profil sichtbar ist. Premium-Mitglieder können sich zusätzlich im privaten Modus umsehen, ohne als Profilbesucher angezeigt zu werden.",
        ],
      },
    ],
  },
  {
    id: "kosten",
    title: "Kosten & Kündigung",
    items: [
      {
        question: "Gibt es versteckte Kosten?",
        answer: ["Nein. Versteckte Kosten müssen Sie bei uns nicht fürchten: Die Basis-Mitgliedschaft ist kostenlos, und Premium buchen Sie nur, wenn Sie es möchten."],
      },
      {
        question: "Verlängert sich die Premium-Mitgliedschaft automatisch?",
        answer: ["Eine Premium-Mitgliedschaft hat immer eine bestimmte Laufzeit. Sie verlängert sich nach einer vorherigen Erinnerung automatisch, sofern Sie nicht kündigen."],
      },
      {
        question: "Wie kann ich kündigen?",
        answer: [
          "Die kurzen Laufzeiten geben Ihnen Freiheit: Eine Kündigung ist ganz einfach über das Kündigungsformular direkt auf unserer Webseite möglich.",
        ],
        links: [{ label: "Zum Kündigungsformular", href: legacyUrl("/kontakt/k%C3%BCndigen/") }, { label: "Widerruf", href: legacyUrl("/kontakt/widerruf/") }],
      },
    ],
  },
  {
    id: "service",
    title: "Service & Magazin",
    items: [
      {
        question: "Wer hilft mir, wenn ich eine Frage habe?",
        answer: ["Wenn Sie hier keine Antwort finden, steht Ihnen unser Team persönlich zur Seite."],
        links: [{ label: "Hilfe & Support", href: legacyUrl("/hilfe/") }, { label: "Kontakt", href: legacyUrl("/kontakt/") }],
      },
      {
        question: "Was finde ich im Magazin?",
        answer: [
          "Im Magazin schreibt unsere Redaktion über Erfolg & Anziehung, Unternehmer Dating, intellektuelle Anziehung, Lifestyle, Status & Luxus sowie Beziehungen auf Augenhöhe – für Singles mit Anspruch.",
        ],
        links: [{ label: "Zum Magazin", href: "/magazin/" }],
      },
    ],
  },
];

export function faqPlainAnswer(item: FaqItem): string {
  return item.answer.join(" ");
}

function page(path: string, family: "about" | "faq", title: string, description: string, heroTitle: string): PublicPage {
  return { path, sourceUrl: `${ORIGIN}${path}`, canonical: `${ORIGIN}${path}`, family, title, description, heroTitle, heroImage: null, categories: [], contentHtml: "" };
}

export const AUTHORED_PAGES: PublicPage[] = [
  page(
    "/ueber-uns/", "about",
    "Über uns – AkademikerSingles.de | Partnersuche mit Niveau",
    "Seit über 20 Jahren verbindet AkademikerSingles.de gebildete Singles: manuell geprüfte Profile, absolute Diskretion und Begegnungen auf Augenhöhe.",
    "Über uns",
  ),
  page(
    "/faq/", "faq",
    "FAQ – Häufige Fragen zu AkademikerSingles.de",
    "Antworten zu Anmeldung, Mitgliedschaft, Profilprüfung, Datenschutz, Kosten und Kündigung bei AkademikerSingles.de – der Partnersuche für Akademiker.",
    "Häufige Fragen",
  ),
];
