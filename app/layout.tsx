import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { ORIGIN, SITE_NAME } from "@/lib/site";
import { staticAsset } from "@/lib/static-asset";
import "./globals.css";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], style: ["normal", "italic"], variable: "--font-display", display: "swap" });
const sans = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(ORIGIN),
  title: SITE_NAME,
  description: "Die Partnersuche für Akademiker, Unternehmer und erfolgreiche Singles mit Anspruch.",
  icons: { icon: staticAsset("/brand/favicon-152.png"), apple: staticAsset("/brand/favicon-152.png") },
};

export const viewport: Viewport = { themeColor: "#0b1730" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de" className={`${display.variable} ${sans.variable}`}><body>{children}</body></html>;
}
