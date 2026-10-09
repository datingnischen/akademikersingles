"""Erzeugt die Hero-Grafik für die Göttinger Stadtseite (eigene Illustration, keine Fremdrechte).

python scripts/build_goettingen_hero.py
Schreibt public/brand/hero-goettingen.svg; die JPG-Fassung entsteht per sharp (siehe Aufruf im Commit).
Motive: Jacobikirche mit schlankem Turm, Johanniskirche mit Doppelturm, Altes Rathaus, Gänseliesel-Brunnen, Fachwerk.
"""
import random
from pathlib import Path

random.seed(7)
W, H = 1600, 1067
HZ = 800
o = []
a = o.append

a(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">')
a('''<defs>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#050d22"/><stop offset=".45" stop-color="#14284f"/><stop offset=".72" stop-color="#7a5a6e"/><stop offset=".86" stop-color="#e0a46a"/><stop offset="1" stop-color="#f3cf93"/></linearGradient>
<radialGradient id="glow" cx=".72" cy=".78" r=".5"><stop offset="0" stop-color="#ffd9a0" stop-opacity=".8"/><stop offset="1" stop-color="#ffd9a0" stop-opacity="0"/></radialGradient>
<linearGradient id="far" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3558"/><stop offset="1" stop-color="#1c2745"/></linearGradient>
<linearGradient id="mid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a2342"/><stop offset="1" stop-color="#101a33"/></linearGradient>
<linearGradient id="near" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d1630"/><stop offset="1" stop-color="#070e20"/></linearGradient>
<linearGradient id="cob" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b3350"/><stop offset="1" stop-color="#0a1126"/></linearGradient>
</defs>''')
a(f'<rect width="{W}" height="{H}" fill="url(#sky)"/><rect width="{W}" height="{H}" fill="url(#glow)"/>')

for _ in range(110):
    x = random.uniform(0, W); y = random.uniform(0, 380)
    r = random.choice([.7, .9, 1.2, 1.6]); op = random.uniform(.35, .95)
    a(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="{r}" fill="#fff6e0" opacity="{op:.2f}"/>')
a('<circle cx="1380" cy="190" r="46" fill="#fff1cf" opacity=".95"/><circle cx="1380" cy="190" r="90" fill="#fff1cf" opacity=".08"/>')

# ferne Hügel (Hainberg) und Baumlinie
a(f'<path d="M0 {HZ-130} C200 {HZ-190} 380 {HZ-120} 560 {HZ-165} S 900 {HZ-110} 1100 {HZ-170} S 1450 {HZ-120} 1600 {HZ-160} V {HZ} H0Z" fill="url(#far)"/>')
t = [f'M0 {HZ-100}']
x = 0
while x < W:
    h = random.uniform(18, 46)
    t.append(f'L{x+8:.0f} {HZ-100-h:.0f} L{x+16:.0f} {HZ-100:.0f}')
    x += 16
t.append(f'L{W} {HZ} L0 {HZ}Z')
a(f'<path d="{" ".join(t)}" fill="#1b2644"/>')


def windows(x0, y0, w, h, cols, rows, lit=.5, ww=9, wh=14, col="#ffcf7a"):
    gx = (w - cols * ww) / (cols + 1)
    gy = (h - rows * wh) / (rows + 1)
    for r in range(rows):
        for c in range(cols):
            if random.random() < lit:
                a(f'<rect x="{x0+gx*(c+1)+ww*c:.1f}" y="{y0+gy*(r+1)+wh*r:.1f}" width="{ww}" height="{wh}" rx="1.5" fill="{col}" opacity="{random.uniform(.55,.95):.2f}"/>')


# Dächer der Altstadt im Hintergrund
x = 0
while x < W:
    w = random.randint(70, 130); h = random.randint(70, 140)
    y = HZ - h
    a(f'<path d="M{x} {HZ} V{y+30} L{x+w/2} {y} L{x+w} {y+30} V{HZ}Z" fill="url(#mid)"/>')
    windows(x + 6, y + 34, w - 12, h - 34, 3, 2, .35, 8, 12)
    x += w + random.randint(-6, 4)

# Jacobikirche mit schlankem Turm
jx = 980
a(f'<path d="M{jx-46} {HZ} V560 H{jx-30} V430 H{jx+30} V560 H{jx+46} V{HZ}Z" fill="url(#near)"/>')
a(f'<path d="M{jx-30} 430 L{jx} 150 L{jx+30} 430Z" fill="#0b1329"/>')
a(f'<rect x="{jx-1.5}" y="108" width="3" height="46" fill="#0b1329"/><circle cx="{jx}" cy="106" r="5" fill="#e8c27a"/>')
for yy in (470, 520):
    a(f'<rect x="{jx-9}" y="{yy}" width="18" height="34" rx="9" fill="#ffcf7a" opacity=".85"/>')
a(f'<path d="M{jx+46} {HZ} V640 L{jx+120} 600 H{jx+190} V{HZ}Z" fill="url(#near)"/>')
for i in range(3):
    a(f'<path d="M{jx+75+i*40} 720 v-40 a12 18 0 0 1 24 0 v40Z" fill="#ffcf7a" opacity=".5"/>')

# Johanniskirche mit Doppelturm
for tx, tall, cap in ((1275, 540, 'spire'), (1395, 500, 'hood')):
    a(f'<path d="M{tx-42} {HZ} V{tall} H{tx+42} V{HZ}Z" fill="url(#near)"/>')
    if cap == 'spire':
        a(f'<path d="M{tx-48} {tall} L{tx} {tall-210} L{tx+48} {tall}Z" fill="#0b1329"/><circle cx="{tx}" cy="{tall-218}" r="4.5" fill="#e8c27a"/>')
    else:
        a(f'<path d="M{tx-48} {tall} Q{tx-48} {tall-70} {tx} {tall-120} Q{tx+48} {tall-70} {tx+48} {tall}Z" fill="#0b1329"/><rect x="{tx-1.5}" y="{tall-150}" width="3" height="34" fill="#0b1329"/><circle cx="{tx}" cy="{tall-152}" r="4" fill="#e8c27a"/>')
    for yy in (tall + 30, tall + 90):
        a(f'<rect x="{tx-8}" y="{yy}" width="16" height="36" rx="8" fill="#ffcf7a" opacity=".9"/>')
    a(f'<circle cx="{tx}" cy="{tall+175}" r="14" fill="#f3e3b8" opacity=".9"/><path d="M{tx} {tall+175} v-9 M{tx} {tall+175} l6 3" stroke="#14213e" stroke-width="1.6" fill="none"/>')
a(f'<path d="M1233 {HZ} V610 H1437 V{HZ}Z" fill="#0b1329"/>')
for i in range(4):
    a(f'<path d="M{1255+i*45} 720 v-52 a12 20 0 0 1 24 0 v52Z" fill="#ffcf7a" opacity=".55"/>')

# Altes Rathaus mit Treppengiebel
rx = 640
a(f'<path d="M{rx} {HZ} V470 H{rx+30} V440 H{rx+60} V400 H{rx+90} V360 H{rx+120} V320 L{rx+150} 270 L{rx+180} 320 V360 H{rx+210} V400 H{rx+240} V440 H{rx+270} V470 H{rx+300} V{HZ}Z" fill="url(#near)"/>')
for k, (yy, n) in enumerate(((330, 1), (380, 3), (430, 5), (490, 6))):
    xs0 = rx + 150 - (n - 1) * 20
    for i in range(n):
        a(f'<path d="M{xs0+i*40-8:.0f} {yy+30} v-28 a8 12 0 0 1 16 0 v28Z" fill="#ffcf7a" opacity="{.5+.1*k:.2f}"/>')
windows(rx + 8, 530, 284, 190, 7, 3, .55, 12, 20)
for i in range(9):
    a(f'<path d="M{rx+20+i*30} 770 v-34 a10 14 0 0 1 20 0 v34Z" fill="#ffcf7a" opacity=".35"/>')
a(f'<path d="M{rx+150} 270 v-26" stroke="#0b1329" stroke-width="3"/><circle cx="{rx+150}" cy="240" r="4" fill="#e8c27a"/>')


def fach(x, w, h, roof=70):
    y = HZ - h
    a(f'<path d="M{x} {HZ} V{y} L{x+w/2} {y-roof} L{x+w} {y} V{HZ}Z" fill="url(#near)"/>')
    a(f'<g stroke="#2f3b62" stroke-width="2.2" opacity=".9" fill="none"><path d="M{x} {y+h*.34} H{x+w} M{x} {y+h*.68} H{x+w} M{x+w/2} {y} V{HZ}"/><path d="M{x} {y+h*.34} L{x+w/2} {y} L{x+w} {y+h*.34} M{x} {y+h*.68} L{x+w/2} {y+h*.34} L{x+w} {y+h*.68}"/></g>')
    windows(x + 8, y + 8, w - 16, h - 16, 3, 3, .55, 10, 16)


fach(300, 120, 210, 80)
fach(425, 100, 170, 60)
fach(530, 105, 230, 86)
fach(1485, 110, 200, 75)

# Boden
a(f'<rect x="0" y="{HZ}" width="{W}" height="{H-HZ}" fill="url(#cob)"/>')
for lx in (230, 820, 1200, 1500):
    a(f'<ellipse cx="{lx}" cy="{HZ+70}" rx="70" ry="9" fill="#ffcf7a" opacity=".13"/><ellipse cx="{lx}" cy="{HZ+70}" rx="28" ry="4" fill="#ffcf7a" opacity=".2"/>')
for r in range(14):
    y = HZ + 14 + r * (r * 1.9 + 8)
    if y > H:
        break
    a(f'<path d="M0 {y:.0f} H{W}" stroke="#3b4568" stroke-width="{.8+r*.12:.1f}" opacity="{.35-r*.012:.2f}"/>')

# Gänseliesel-Brunnen
fx = 470
a(f'<ellipse cx="{fx}" cy="{HZ+112}" rx="120" ry="18" fill="#050a18" opacity=".55"/>')
a(f'<path d="M{fx-92} {HZ+100} Q{fx-92} {HZ+60} {fx-70} {HZ+58} H{fx+70} Q{fx+92} {HZ+60} {fx+92} {HZ+100}Z" fill="#0a1229" stroke="#3d568f" stroke-width="1.6"/><ellipse cx="{fx}" cy="{HZ+58}" rx="70" ry="11" fill="#243c6b"/><ellipse cx="{fx}" cy="{HZ+58}" rx="58" ry="8" fill="#6a89c4" opacity=".55"/>')
a(f'<path d="M{fx-14} {HZ+58} V{HZ-20} Q{fx} {HZ-30} {fx+14} {HZ-20} V{HZ+58}Z" fill="#0a1229" stroke="#3d568f" stroke-width="1.6"/>')
a(f'<path d="M{fx-48} {HZ-20} H{fx+48} V{HZ-8} H{fx-48}Z" fill="#0a1229" stroke="#3d568f" stroke-width="1.6"/><path d="M{fx-34} {HZ-8} V{HZ-60} H{fx+34} V{HZ-8}Z" fill="#0a1229" stroke="#3d568f" stroke-width="1.6"/>')
a(f'<ellipse cx="{fx}" cy="{HZ-92}" rx="13" ry="14" fill="#0a1229" stroke="#3d568f" stroke-width="1.6"/><path d="M{fx-20} {HZ-60} Q{fx} {HZ-110} {fx+20} {HZ-60}Z" fill="#0a1229" stroke="#3d568f" stroke-width="1.6"/>')
a(f'<ellipse cx="{fx-26}" cy="{HZ-72}" rx="11" ry="7" fill="#0a1229" stroke="#3d568f" stroke-width="1.6"/><path d="M{fx-34} {HZ-76} q-8 -14 -4 -22" stroke="#0a1229" stroke-width="3" fill="none" stroke-linecap="round"/>')
a(f'<ellipse cx="{fx+28}" cy="{HZ-72}" rx="11" ry="7" fill="#0a1229" stroke="#3d568f" stroke-width="1.6"/><path d="M{fx+36} {HZ-76} q8 -14 4 -22" stroke="#0a1229" stroke-width="3" fill="none" stroke-linecap="round"/>')
a(f'<path d="M{fx-20} {HZ-55} q-18 6 -28 40 M{fx+20} {HZ-55} q18 6 28 40" stroke="#bcd3ff" stroke-width="1.6" fill="none" opacity=".5"/>')

# Laternen und ein Paar beim Abendspaziergang
for lx in (230, 820, 1200, 1500):
    a(f'<rect x="{lx-2}" y="{HZ-170}" width="4" height="190" fill="#070e20"/><path d="M{lx-10} {HZ-176} h20 l-4 -14 h-12Z" fill="#070e20"/><rect x="{lx-7}" y="{HZ-178}" width="14" height="14" rx="3" fill="#ffd98a"/><circle cx="{lx}" cy="{HZ-171}" r="26" fill="#ffd98a" opacity=".18"/>')
for px in (1040, 1075):
    a(f'<ellipse cx="{px}" cy="{HZ+60}" rx="12" ry="3" fill="#050a18" opacity=".6"/><rect x="{px-6}" y="{HZ+8}" width="12" height="46" rx="5" fill="#070e20"/><circle cx="{px}" cy="{HZ+1}" r="7.5" fill="#070e20"/>')
a('</svg>')

out = Path(__file__).resolve().parent.parent / 'public' / 'brand' / 'hero-goettingen.svg'
out.write_text('\n'.join(o), encoding='utf-8')
print(out)
