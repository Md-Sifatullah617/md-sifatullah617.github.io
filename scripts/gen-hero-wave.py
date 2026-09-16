#!/usr/bin/env python3
"""Generates the <path> markup for src/components/HeroWave.astro.

The hero wave is baked static SVG, not runtime-drawn — this script is a one-time
(or occasional) authoring tool, not part of the build. Re-run and paste the output
back into HeroWave.astro (between the <defs> and closing </svg>) if the shape or
line count needs to change.

Usage: python3 scripts/gen-hero-wave.py > /tmp/hero-wave-paths.txt
"""

import math

W, H = 1600, 900
N_LINES = 40
SAMPLES = 44


def mid_y(x):
    t = x / W
    return H * 0.60 - H * 0.28 * math.sin(t * math.pi * 1.15 - 0.35)


def envelope(x):
    """Amplitude multiplier: pinches to near-zero at one knot, giving the
    braided-ribbon look (lines converge, cross, and fan back out). The knot
    sits at t=0.62 — the gap between the hero text column and the portrait —
    so the busiest, brightest point of the graphic never crosses the headline."""
    t = x / W
    knot = math.exp(-((t - 0.62) ** 2) / (2 * 0.05**2))
    return max(0.10, 1 - 0.90 * knot)


def small_wave(x, phase):
    t = x / W
    return math.sin(t * math.pi * 2.4 + phase) * H * 0.02


def build_lines():
    base_offsets = [(i / (N_LINES - 1) - 0.5) * H * 0.60 for i in range(N_LINES)]
    lines = []
    for i, off in enumerate(base_offsets):
        pts = []
        for s in range(SAMPLES + 1):
            x = W * s / SAMPLES
            y = mid_y(x) + off * envelope(x) + small_wave(x, i * 0.15)
            pts.append((round(x, 1), round(y, 1)))
        d = "M" + "L".join(f"{x},{y}" for x, y in pts)
        lines.append((d, i / (N_LINES - 1)))
    return lines


def main():
    lines = build_lines()
    out = ['<g class="wave-glow">']
    for i, (d, frac) in enumerate(lines):
        if i % 3 != 0:
            continue
        op = 0.12 + 0.30 * (1 - abs(frac - 0.5) * 2)
        out.append(f'<path d="{d}" opacity="{op:.2f}" stroke-width="3"/>')
    out.append("</g>")
    out.append('<g class="wave-crisp">')
    for d, frac in lines:
        op = 0.22 + 0.60 * (1 - abs(frac - 0.5) * 2)
        out.append(f'<path d="{d}" opacity="{op:.2f}" stroke-width="1.3"/>')
    out.append("</g>")
    print("\n".join(out))


if __name__ == "__main__":
    main()
