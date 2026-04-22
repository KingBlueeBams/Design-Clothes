"""
Canvas: Neon Concrete Restraint — Refined Pass
Philosophy: explosive urban pop-surrealist art contained within
a clinical neumorphic museum frame. 90% visual, 10% text.
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

W, H = 2480, 3508  # A4 @ 300dpi

# ── Palette ──────────────────────────────────────────────────────────────────
BG               = (238, 234, 229)
NEUMORPHIC_LIGHT = (255, 254, 251)
NEUMORPHIC_SHADOW= (196, 190, 182)

NEON_CYAN    = (0, 255, 230)
NEON_MAGENTA = (255, 20, 170)
NEON_YELLOW  = (210, 255, 0)

INK       = (14, 12, 10)
INK_MID   = (80,  76,  72)
INK_GHOST = (160, 155, 148)
ACCENT    = (90,  86,  82)

# ── Fonts ─────────────────────────────────────────────────────────────────────
FONT_DIR = r"d:\Learn\Design Clothes\.agents\skills\canvas-design\canvas-fonts"

def font(name, size):
    try:
        return ImageFont.truetype(os.path.join(FONT_DIR, name), size)
    except:
        return ImageFont.load_default()

F_MONO   = lambda s: font("GeistMono-Regular.ttf", s)
F_JURA   = lambda s: font("Jura-Light.ttf", s)
F_BIG    = lambda s: font("BigShoulders-Bold.ttf", s)
F_OUTFIT = lambda s: font("Outfit-Regular.ttf", s)
F_IBM    = lambda s: font("IBMPlexMono-Regular.ttf", s)

# ── Utilities ─────────────────────────────────────────────────────────────────

def centered(draw, text, fnt, y, color):
    bb = draw.textbbox((0, 0), text, font=fnt)
    draw.text(((W - (bb[2]-bb[0])) // 2, y), text, font=fnt, fill=color)

def ltext(draw, text, fnt, x, y, color):
    draw.text((x, y), text, font=fnt, fill=color)

def rtext(draw, text, fnt, x, y, color):
    bb = draw.textbbox((0, 0), text, font=fnt)
    draw.text((x - (bb[2]-bb[0]), y), text, font=fnt, fill=color)

def neumorphic_card(img, x, y, w, h, r=90, depth=36):
    """Neumorphic raised card — soft extruded from BG."""
    d = ImageDraw.Draw(img, "RGBA")
    for i in range(depth, 0, -1):
        a = int(110 * (i/depth)**1.6)
        d.rounded_rectangle([x+i, y+i, x+w+i, y+h+i],
                             radius=r, outline=(*NEUMORPHIC_SHADOW, a), width=2)
    for i in range(depth, 0, -1):
        a = int(190 * (i/depth)**1.6)
        d.rounded_rectangle([x-i, y-i, x+w-i, y+h-i],
                             radius=r, outline=(*NEUMORPHIC_LIGHT, a), width=2)
    d.rounded_rectangle([x, y, x+w, y+h], radius=r, fill=BG)

def glow_border(layer, x, y, w, h, color, n=9, base=3, radius=14):
    d = ImageDraw.Draw(layer, "RGBA")
    for i in range(n, 0, -1):
        a = int(255 * (i/n)**1.8)
        thick = base + (n-i)*5
        pad = thick // 2
        d.rounded_rectangle([x-pad, y-pad, x+w+pad, y+h+pad],
                             radius=radius+pad, outline=(*color, a), width=thick)

# ──────────────────────────────────────────────────────────────────────────────
img  = Image.new("RGBA", (W, H), (*BG, 255))
draw = ImageDraw.Draw(img, "RGBA")

# 1. Micro grid — graph-paper engineering texture
gc = (210, 205, 198, 50)
for gx in range(0, W, 80):
    draw.line([(gx, 0), (gx, H)], fill=gc, width=1)
for gy in range(0, H, 80):
    draw.line([(0, gy), (W, gy)], fill=gc, width=1)

# 2. Registration crosses
cs, mc = 56, 130
cc = (*INK_GHOST, 100)
for cx, cy in [(mc, mc), (W-mc, mc), (mc, H-mc), (W-mc, H-mc)]:
    draw.line([(cx-cs, cy), (cx+cs, cy)], fill=cc, width=2)
    draw.line([(cx, cy-cs), (cx, cy+cs)], fill=cc, width=2)
    draw.ellipse([cx-7, cy-7, cx+7, cy+7], outline=cc, width=2)

# 3. Top catalogue bar
draw.line([(120, 210), (W-120, 210)], fill=(*ACCENT, 70), width=1)
ltext(draw, "NCR · 001", F_IBM(30), 120, 148, (*INK_GHOST, 180))
rtext(draw, "EXHIBIT  /  PRIMARY FIELD  /  NCR STUDIO 2026",
      F_JURA(28), W-120, 150, (*INK_GHOST, 140))

# 4. Neumorphic card
CM = 175
CX, CY = CM, 290
CW, CH = W - 2*CM, int(H*0.52)
neumorphic_card(img, CX, CY, CW, CH, r=100, depth=44)
draw = ImageDraw.Draw(img, "RGBA")

# 5. Art zone fill ─────────────────────────────────────────────────────────────
AX, AY = CX+68, CY+68
AW, AH = CW-136, CH-136

# Dark concrete base
draw.rounded_rectangle([AX, AY, AX+AW, AY+AH], radius=64, fill=(16, 14, 12))

# ── Graffiti abstraction: urban paint-over layers ──────────────────────────────

# Layer A — magenta slab, upper-left, aggressive
draw.polygon([
    (AX+40, AY+40), (AX+760, AY+40), (AX+580, AY+580), (AX+40, AY+580)
], fill=(210, 0, 140, 230))

# Layer B — yellow-green diagonal sweep, upper-right
draw.polygon([
    (AX+600, AY+40), (AX+AW-40, AY+40),
    (AX+AW-40, AY+460), (AX+320, AY+460)
], fill=(200, 248, 0, 215))

# Layer C — neon cyan anchor block, lower-right
draw.rectangle([AX+AW-500, AY+AH-500, AX+AW-40, AY+AH-40],
               fill=(0, 210, 200, 220))

# Layer D — ink slab, central zone, semi-transparent to let colors breathe
draw.rectangle([AX+260, AY+200, AX+AW-260, AY+AH-180],
               fill=(12, 10, 8, 130))

# Layer E — magenta thin vertical slash through center
draw.rectangle([AX+AW//2-8, AY+30, AX+AW//2+8, AY+AH-30],
               fill=(*NEON_MAGENTA, 240))

# Layer F — neon cyan vertical bar, right edge
draw.rectangle([AX+AW-180, AY+50, AX+AW-100, AY+AH-50],
               fill=(0, 255, 220, 190))

# Layer G — yellow horizontal rule, full width
draw.rectangle([AX+40, AY+AH//2-10, AX+AW-40, AY+AH//2+10],
               fill=(*NEON_YELLOW, 220))

# Layer H — systematic neon mark rows (not random — deliberate, catalogued)
mark_colors = [NEON_CYAN, NEON_MAGENTA, NEON_YELLOW]
rows = [AY+260, AY+340, AY+420, AY+500, AY+AH-300, AY+AH-220, AY+AH-140]
cols_x = [AX+300, AX+460, AX+620, AX+780, AX+940, AX+1100]
for ri, ry in enumerate(rows):
    for ci, rx in enumerate(cols_x):
        if (ri + ci) % 3 == 0:
            continue
        mc = mark_colors[(ri + ci) % 3]
        w_mark = [80, 120, 60, 100, 80, 120][ci % 6]
        draw.rectangle([rx, ry, rx + w_mark, ry + 10], fill=(*mc, 140))

# Layer I — systematic neon dot matrix (catalogue feel within art zone)
dot_grid_x = [AX + 80, AX + 200, AX + 320]
dot_grid_y = [AY + 80, AY + AH - 90]
dot_seq = [NEON_CYAN, NEON_YELLOW, NEON_MAGENTA, NEON_CYAN, NEON_MAGENTA, NEON_YELLOW]
for i, (dx, dy) in enumerate(
    [(x, y) for y in dot_grid_y for x in dot_grid_x]):
    dc = dot_seq[i % len(dot_seq)]
    draw.ellipse([dx-20, dy-20, dx+20, dy+20], fill=(*dc, 255))
    draw.ellipse([dx-24, dy-24, dx+24, dy+24], outline=(*dc, 80), width=2)

# 6. Neon glow bleed layers
glow_layer = Image.new("RGBA", (W, H), (0,0,0,0))
glow_border(glow_layer, AX, AY, AW, AH, NEON_CYAN, n=10, base=3, radius=64)
glow_blurred = glow_layer.filter(ImageFilter.GaussianBlur(radius=22))
img = Image.alpha_composite(img, glow_blurred)

glow2 = Image.new("RGBA", (W, H), (0,0,0,0))
glow_border(glow2, AX, AY, AW, AH, NEON_MAGENTA, n=5, base=2, radius=64)
glow2_blurred = glow2.filter(ImageFilter.GaussianBlur(radius=12))
img = Image.alpha_composite(img, glow2_blurred)

draw = ImageDraw.Draw(img, "RGBA")

# 7. Crisp inner art frame
draw.rounded_rectangle([AX, AY, AX+AW, AY+AH],
                        radius=64, outline=(*NEON_CYAN, 200), width=3)
# ghost outer frame inside card
draw.rounded_rectangle([AX-12, AY-12, AX+AW+12, AY+AH+12],
                        radius=72, outline=(*NEON_CYAN, 40), width=1)

# 8. Typography ─────────────────────────────────────────────────────────────────
TITLE_Y = CY + CH + 80

# Main title — monumental
centered(draw, "NEON  CONCRETE  RESTRAINT", F_BIG(120), TITLE_Y, INK)

# Subtitle
centered(draw,
         "AN AESTHETIC MANIFESTO  ·  POP-SURREALISM CONTAINED",
         F_JURA(38), TITLE_Y + 164, (*INK_MID, 180))

# Neon accent divider
DIV_Y = TITLE_Y + 228
draw.line([(350, DIV_Y), (W-350, DIV_Y)], fill=(*NEON_CYAN, 140), width=1)

# Flanking neon micro-dashes
for nx in [350, 350+80, W-350-80, W-350]:
    draw.rectangle([nx-2, DIV_Y-3, nx+2, DIV_Y+3], fill=(*NEON_CYAN, 200))

# 9. Three-column annotation
COL_Y = DIV_Y + 54
COL_GAP = (W - 2*CM) // 3
cols = [
    ("SPACE / FORM",     ["NEUMORPHIC VOLUME", "SOFT-LIGHT SHADOW", "SCULPTED EMERGENCE"]),
    ("COLOR / MATERIAL", ["EXTRACTED CHROMATICS", "NEON BLEED SYSTEM", "NEUTRAL GROUND"]),
    ("SCALE / RHYTHM",   ["MONUMENTAL FOCAL", "MICROSCOPIC FUNCTION", "NEGATIVE OCEAN"]),
]
for i, (label, vals) in enumerate(cols):
    cx = CM + i * COL_GAP + COL_GAP // 2
    nc = [NEON_CYAN, NEON_MAGENTA, NEON_YELLOW][i]

    # Label
    bb = draw.textbbox((0,0), label, font=F_MONO(26))
    tw = bb[2]-bb[0]
    draw.text((cx - tw//2, COL_Y), label, font=F_MONO(26), fill=(*nc, 220))

    # Rule
    draw.line([(cx-130, COL_Y+42), (cx+130, COL_Y+42)],
              fill=(*ACCENT, 60), width=1)

    # Values
    for j, v in enumerate(vals):
        bb2 = draw.textbbox((0,0), v, font=F_OUTFIT(28))
        tw2 = bb2[2]-bb2[0]
        draw.text((cx - tw2//2, COL_Y + 58 + j*46), v,
                  font=F_OUTFIT(28), fill=(*INK_GHOST, 180))

# 10. Neon color-key strip — neon palette swatches (museum legend)
SWATCH_Y = COL_Y + 230
swatch_data = [
    (NEON_CYAN,    "CYAN  #00FFE6"),
    (NEON_MAGENTA, "MAGENTA  #FF14AA"),
    (NEON_YELLOW,  "YELLOW  #D2FF00"),
]
sw_total = 3 * 260
sw_start = (W - sw_total) // 2
for i, (sc, sl) in enumerate(swatch_data):
    sx = sw_start + i * 260
    draw.rounded_rectangle([sx, SWATCH_Y, sx+36, SWATCH_Y+36],
                            radius=6, fill=(*sc, 255))
    draw.text((sx+50, SWATCH_Y+6), sl,
              font=F_IBM(24), fill=(*INK_GHOST, 160))

# 11. Bottom bar
BAR_Y = H - 220
draw.line([(120, BAR_Y), (W-120, BAR_Y)], fill=(*ACCENT, 70), width=1)
ltext(draw, "NCR STUDIO  ·  2026", F_IBM(26), 120, BAR_Y+38, (*INK_GHOST, 140))
centered(draw, "CRAFTED WITH PAINSTAKING ATTENTION",
         F_IBM(24), BAR_Y+38, (*INK_GHOST, 90))
rtext(draw, "A4 · 300 DPI · SINGULAR EDITION",
      F_IBM(26), W-120, BAR_Y+38, (*INK_GHOST, 140))

# Bottom accent dots
for nx, nc in [(W//2-60, NEON_CYAN), (W//2, NEON_MAGENTA), (W//2+60, NEON_YELLOW)]:
    draw.ellipse([nx-5, BAR_Y+88, nx+5, BAR_Y+98], fill=(*nc, 200))

# 12. Vignette — museum ambient light
vig = Image.new("RGBA", (W, H), (0,0,0,0))
vd  = ImageDraw.Draw(vig, "RGBA")
for s in range(50):
    a = int(50 * (s/50)**2)
    ins = s * 14
    vd.rectangle([ins, ins, W-ins, H-ins], outline=(0,0,0,a), width=14)
vig = vig.filter(ImageFilter.GaussianBlur(radius=28))
img = Image.alpha_composite(img, vig)

# ── Export ────────────────────────────────────────────────────────────────────
out = r"d:\Learn\Design Clothes\neon_concrete_restraint.png"
img.convert("RGB").save(out, "PNG", dpi=(300,300))
print(f"Saved: {out}")