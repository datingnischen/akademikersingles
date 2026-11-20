// Vergleichswerte für die Städteübersicht (hubFacts) aus den Dossiers setzen – je Land dieselben vier Kennzahlen.
import { readFileSync, writeFileSync } from "node:fs";

const FACTS = {
  "ch/zuerich": ["58,7 %", "61.394", "58,9 %", "116"],
  "ch/basel": ["36,6 %", "27.857", "53,7 %", "113"],
  "ch/bern": ["43,9 %", "24.496", "60,4 %", "105"],
  "ch/lausanne": ["42,0 %", "30.433", "57,1 %", "111"],
  "ch/st-gallen": ["46 %", "15.646", "50,6 %", "127"],
  "at/wien": ["26,4 %", "166.413", "2,04", "103"],
  "at/graz": ["30,7 %", "55.254", "1,94", "109"],
  "at/linz": ["20,4 %", "28.680", "1,94", "109"],
  "at/salzburg": ["24,4 %", "19.959", "1,99", "103"],
  "at/klagenfurt": ["22,3 %", "13.655", "1,92", "99"],
  "at/krems": ["17,8 %", "6.440", "1,97", "114"],
  "at/leoben": ["15,8 %", "2.929", "1,85", "115"],
  "at/innsbruck": ["29,7 %", "31.677", "1,93", "110"],
};
const LABELS = {
  ch: ["Hochschul- oder Tertiärabschluss", "Studierende", "ledig (25–54 Jahre)", "ledige Männer je 100 Frauen"],
  at: ["Hochschulabschluss ab 15 Jahren", "Studierende", "Personen je Haushalt", "Männer je 100 Frauen (30–49)"],
};

for (const [slug, values] of Object.entries(FACTS)) {
  const market = slug.split("/")[0];
  const file = `data/city-profiles/${slug}.json`;
  const profile = JSON.parse(readFileSync(file, "utf8"));
  profile.hubFacts = LABELS[market].map((label, index) => ({ label, value: values[index] }));
  writeFileSync(file, JSON.stringify(profile, null, 1) + "\n");
}
console.log("hubFacts gesetzt für", Object.keys(FACTS).length, "Städte");
