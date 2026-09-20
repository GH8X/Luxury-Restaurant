# Maison Noir — Luxury Restaurant Website Demo

A complete, presentation-ready restaurant website for a fictional Parisian fine-dining house.
Built to be shown to real restaurant owners: every word, price, dish and photograph can be edited
live from an owner dashboard.

## Tech stack

| | |
| --- | --- |
| Framework | React 19 + Vite 6 (TypeScript) |
| Styling | Tailwind CSS 3 + shadcn-style Radix primitives |
| Animation | Framer Motion (scroll reveals, parallax, page fades, marquees) |
| Icons | lucide-react |
| Routing | React Router 7 |
| Data | Local content store persisted to `localStorage` (no server required) |

## Pages

| Route | What is there |
| --- | --- |
| `/` | Hero, accolade marquee, signature dishes, chef introduction, restaurant story, featured menu, gallery preview, guest reviews carousel, opening hours, map, reservation CTA |
| `/menu` | Tasting menu panel, then six categories — Starters, Main Courses, Seafood, Meat, Desserts, Drinks — each dish with name, description, price, photograph and tags |
| `/about` | Story, values, 26-year timeline, chef feature |
| `/gallery` | Masonry grid with a keyboard-navigable lightbox |
| `/reservations` | Full reservation form (name, phone, email, guests, date, time, special request), WhatsApp CTA, hours, policies |
| `/contact` | Contact cards, enquiry form, opening hours, private dining, embedded map |
| `/admin` | Owner dashboard — menu & prices, reservations, gallery, opening hours, homepage content, identity & contact |

## Owner dashboard

Open `/admin` and use the demo passcode **`maison`** (there is a tap-to-fill button on the gate).

Everything you change saves instantly to the browser and re-renders across the public site,
which makes for a convincing live pitch: change a price in the dashboard, then switch to `/menu`.

- **Overview** — today's covers, pending requests, average plate, latest bookings, quick actions
- **Menu & Prices** — add, edit, duplicate, hide or delete dishes; set prices, categories, dietary tags, signature/featured flags and photographs
- **Reservations** — filter today / pending / upcoming, change status, read guest notes, call, email or confirm on WhatsApp
- **Gallery** — reorder tiles, rewrite captions, change shape, swap image URLs
- **Opening Hours** — per-day open/close times, closed toggles, service notes
- **Homepage** — hero headline and subtitle, CTA labels, hero badges, chef biography and accolades, story paragraphs, guest reviews, section headings and the closing call-to-action
- **Identity** — restaurant name, tagline, phone, WhatsApp, email, address, social links, map query, tasting menu

Header actions: **Export** downloads the whole content model as JSON (a real build would feed this
into a CMS or database), and **Reset demo** restores the factory content.

## Running it

```bash
bun install
bun run dev        # http://localhost:5173
bun run typecheck  # tsc -b --noEmit
bun run build      # static output in dist/
```

## Making it yours

1. **Brand & details** — every phone number, address and social link lives in the dashboard under *Identity*, or in `src/data/content.ts`.
2. **Photography** — swap any image from the dashboard (paste a URL) or edit the registry in `src/data/images.ts`. All demo photographs are hosted on Unsplash.
3. **Copy** — dashboard ✨ *Homepage* covers hero, chef, story, reviews and CTA.
4. **Connecting a real backend** — the content store in `src/lib/store.tsx` is the single seam. Replace its `localStorage` reads/writes with API calls to persist edits, reservations and images for the restaurant.

## Notes

- Mobile-first and fully responsive from 320px up; the navigation becomes a full-height drawer.
- Accessibility: semantic landmarks, labelled controls, visible focus rings, `prefers-reduced-motion` respected.
- The WhatsApp reservation buttons deep-link to `wa.me` with the booking details pre-filled.
