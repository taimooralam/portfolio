# Option D (square Kufic عالم, purple letters, gold kashida), pixelated: every grid module
# is cut into n x n square tiles with a thin gap between them, like mosaic tilework.
import sys, json
OUT = sys.argv[1]  # e.g. public/brand
P, G, C = "#2B1240", "#D4AF37", "#F6F0E6"
CELLS = {
    0: [6, 8], 1: [6, 8], 2: [6, 8], 3: [6, 8, 12, 13, 14],
    4: [2, 3, 4, 6, 8, 12], 5: [2, 4, 6, 8, 12],
    6: [0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14],
}
KASHIDA = {(6, 9), (6, 10), (6, 11)}
W, H = 15, 7
def mark(n, gap, letters=P, kash=G, bg=None, square=False):
    m = 30.0                      # one module
    t = m / n                     # one tile
    g = gap * t
    rects_l, rects_k = [], []
    for r, cs in CELLS.items():
        for c in cs:
            for i in range(n):
                for j in range(n):
                    x, y = c * m + j * t + g / 2, r * m + i * t + g / 2
                    s = f'M{x:.2f} {y:.2f}h{t-g:.2f}v{t-g:.2f}h{-(t-g):.2f}Z'
                    (rects_k if (r, c) in KASHIDA else rects_l).append(s)
    w, h = W * m, H * m
    if square:
        side = w / 0.72; vb = (-(side - w) / 2, -(side - h) / 2, side, side)
    else:
        pad = m * 0.5; vb = (-pad, -pad, w + 2 * pad, h + 2 * pad)
    bgr = f'<rect x="{vb[0]:.2f}" y="{vb[1]:.2f}" width="{vb[2]:.2f}" height="{vb[3]:.2f}" fill="{bg}"/>' if bg else ""
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb[0]:.2f} {vb[1]:.2f} {vb[2]:.2f} {vb[3]:.2f}" role="img" aria-label="Alam"><title>عالم</title>{bgr}'
            f'<path fill="{letters}" d="{"".join(rects_l)}"/><path fill="{kash}" d="{"".join(rects_k)}"/></svg>\n')
variants = {"1x1": (1, 0.10), "2x2": (2, 0.14), "3x3": (3, 0.16)}
out = {}
for k, (n, gap) in variants.items():
    out[k] = {"cream": mark(n, gap), "purple": mark(n, gap, letters=C), "icon": mark(n, gap, bg=C, square=True), "icon_purple": mark(n, gap, letters=G, kash=C, bg=P, square=True)}
    for kind, svg in out[k].items():
        open(f"{OUT}/alam-pixel-{k}-{kind}.svg", "w").write(svg)
json.dump(out, open(f"{OUT}/pixel.json", "w"))
print("ok")
