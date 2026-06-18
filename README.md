# LongevityRx — "7 Benefits GLP-1 Users Love About Liv120"

A production-ready, mobile-first listicle landing page for **Liv120 Cellular Superfood**,
built to convert GLP-1 medication users toward the **GLP Stack** bundle (Liv120 + StemCell Protein).

---

## How to run

**Option A — just open it**
Double-click `index.html` to open it in any modern browser. All paths are relative, so
CSS, JavaScript, and images load with no setup.

**Option B — local server (recommended for the cleanest result)**
From this folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

> **Note:** Tailwind (CDN) and the Google Fonts (Aboreto, Fraunces, Open Sans) load over the
> internet, so view the page online. With no connection, the layout still works — the browser
> simply falls back to system fonts.

---

## File structure

```
liv120-glp1-listicle/
├── index.html          # Full page — all sections in brief order, with section comment markers
├── css/
│   └── custom.css       # Brand design system: :root tokens + per-section styles + responsive
├── js/
│   └── main.js          # Scroll reveal, mobile menu, FAQ accordion, countdown timer
├── images/              # Optimized product & lifestyle photography (web-sized)
└── README.md
```

The page is built on **HTML5 + Tailwind (CDN) + a custom design-token CSS layer**, with
**minimal vanilla JavaScript** (no libraries/build step). Every section is bracketed with
matching `<!-- ===== NAME ===== -->` / `/* ===== NAME ===== */` comments in both files for
easy traceability.

---

## Page sections (top → bottom)

Announcement bar → Sticky nav (with mobile drawer) → Hero (Dr. Cole authority above the fold) →
Trust marquee → "The gap" band → **7 benefit cards** → Stats → How to use → "One scoop replaces
six" comparison → What-to-expect timeline → **GLP Stack bundle (primary conversion)** →
Ingredients (8-color spectrum) → Reviews (4.73★) → FAQ → Final CTA → Footer (with FDA disclaimer).

---

## Design system

- **Type:** Aboreto (display headlines), Fraunces (editorial serif), Open Sans (body) — all tokenized.
- **Color:** full LRX palette as CSS custom properties in `:root` (forest green primary, pale mint,
  cream, plus the 8-color antioxidant spectrum used in dot rows, bars, and ingredient orbs).
- **Motion:** opacity-only fade-in on scroll (~0.7s, ease-out, plays once); one gentle pulse on the
  bundle CTA. Honors `prefers-reduced-motion`. No slide/scale/parallax.

---

## Handoff / CRO notes

- **CTAs are placeholders.** Primary "Shop the GLP Stack" and secondary "Shop Liv120" buttons
  currently link to the on-page `#bundle` section. Point them at your real checkout/cart URLs
  before launch (search `href="#bundle"` and the footer links).
- **Newsletter form** posts nowhere yet — wire it to your ESP.
- **Countdown** is a soft front-end timer seeded at 02:47:12; it loops rather than expiring.
  Swap for a real campaign deadline if desired.
- **Copy** stays in structure/function language ("supports," "helps maintain") and uses no GLP-1
  drug brand names, per compliance. The FDA disclaimer is in the footer.
