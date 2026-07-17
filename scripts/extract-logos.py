#!/usr/bin/env python3
"""Extract transparent mystAIle wordmarks from the brand sheet."""

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SHEET = ROOT / 'images' / 'logo-mystaile1.png'
OUT = ROOT / 'public'

GOLD_REF = (184, 156, 114)  # #B89C72
CHARCOAL_REF = (34, 34, 34)  # #222222


def dist(a: tuple[int, int, int], b: tuple[int, int, int]) -> float:
    return ((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2) ** 0.5


def make_transparent_white_bg(img: Image.Image, soft: float = 14) -> Image.Image:
    out = img.copy()
    px = out.load()
    w, h = out.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            d = (255 - r + 255 - g + 255 - b) / 3.0
            if d <= 1.5:
                alpha = 0
            elif d < soft:
                alpha = int(255 * (d - 1.5) / (soft - 1.5))
            else:
                alpha = 255
            px[x, y] = (r, g, b, min(a, alpha))
    return out


def tight_crop(img: Image.Image, pad: int = 8) -> Image.Image:
    px = img.load()
    w, h = img.size
    minx, miny, maxx, maxy = w, h, 0, 0
    found = False
    for y in range(h):
        for x in range(w):
            if px[x, y][3] > 8:
                found = True
                minx = min(minx, x)
                miny = min(miny, y)
                maxx = max(maxx, x)
                maxy = max(maxy, y)
    if not found:
        raise SystemExit('No opaque pixels found')
    return img.crop(
        (max(0, minx - pad), max(0, miny - pad), min(w, maxx + 1 + pad), min(h, maxy + 1 + pad))
    )


def to_light_variant(img: Image.Image) -> Image.Image:
    out = img.copy()
    px = out.load()
    w, h = out.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            dg = dist((r, g, b), GOLD_REF)
            dc = dist((r, g, b), CHARCOAL_REF)
            chroma = max(r, g, b) - min(r, g, b)
            is_warm_gold = (r > g >= b - 5) and chroma > 18 and r > 120
            if is_warm_gold or (dg < dc and dg < 80 and chroma > 15):
                px[x, y] = (r, g, b, a)
            else:
                px[x, y] = (255, 255, 255, a)
    return out


def extract_icon(src: Image.Image) -> Image.Image | None:
    w, h = src.size
    px = src.load()
    best = None
    for y0 in range(500, 650, 2):
        for x0 in range(1250, 1450, 2):
            r, g, b, _ = px[x0, y0]
            if r >= 25 or g >= 25 or b >= 25:
                continue
            x1 = x0
            while x1 < w - 1 and px[x1 + 1, y0][0] < 40:
                x1 += 1
            y1 = y0
            while y1 < h - 1 and px[x0, y1 + 1][0] < 40:
                y1 += 1
            bw, bh = x1 - x0 + 1, y1 - y0 + 1
            if bw > 80 and bh > 80 and abs(bw - bh) < 30:
                area = bw * bh
                if best is None or area > best[0]:
                    best = (area, x0, y0, x1, y1)
    if best is None:
        return None
    _, x0, y0, x1, y1 = best
    while x0 > 0 and px[x0 - 1, (y0 + y1) // 2][0] < 45:
        x0 -= 1
    while y0 > 0 and px[(x0 + x1) // 2, y0 - 1][0] < 45:
        y0 -= 1
    while x1 < w - 1 and px[x1 + 1, (y0 + y1) // 2][0] < 45:
        x1 += 1
    while y1 < h - 1 and px[(x0 + x1) // 2, y1 + 1][0] < 45:
        y1 += 1
    icon = src.crop((x0, y0, x1 + 1, y1 + 1)).copy()
    op = icon.load()
    iw, ih = icon.size
    for y in range(ih):
        for x in range(iw):
            r, g, b, a = op[x, y]
            if r > 200 and g > 200 and b > 200:
                op[x, y] = (r, g, b, 0)
    return icon


def main() -> None:
    src = Image.open(SHEET).convert('RGBA')
    # Top primary wordmark on the brand sheet
    dark_raw = src.crop((304, 140, 1249, 364))
    dark = tight_crop(make_transparent_white_bg(dark_raw), pad=8)
    light = to_light_variant(dark)

    OUT.mkdir(parents=True, exist_ok=True)
    dark.save(OUT / 'logo-wordmark.png', optimize=True)
    light.save(OUT / 'logo-wordmark-light.png', optimize=True)
    print(f'Wrote {OUT / "logo-wordmark.png"} {dark.size}')
    print(f'Wrote {OUT / "logo-wordmark-light.png"} {light.size}')

    icon = extract_icon(src)
    if icon is not None:
        icon.save(OUT / 'logo-icon.png', optimize=True)
        print(f'Wrote {OUT / "logo-icon.png"} {icon.size}')


if __name__ == '__main__':
    main()
