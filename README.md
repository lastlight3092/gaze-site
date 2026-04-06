# GAZE — Private Luxury Ecommerce

A premium frontend-only ecommerce site for GAZE, a discreet luxury men's underwear brand based in Bangkok. Built with Next.js 15, TypeScript, and Tailwind CSS.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS custom properties
- **State**: React Context (cart), localStorage persistence
- **Rendering**: Server Components + Client Components

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Build for production:
```bash
npm run build && npm start
```

---

## Project Structure

```
gaze/
├── app/
│   ├── page.tsx                    # Homepage
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Design tokens + CSS variables
│   ├── collections/
│   │   ├── page.tsx                # Collections overview
│   │   └── [slug]/
│   │       ├── page.tsx            # Collection detail (server)
│   │       └── CollectionClient.tsx
│   ├── product/[slug]/
│   │   ├── page.tsx                # Product page (server)
│   │   └── ProductClient.tsx       # ATC, selectors (client)
│   ├── cart/page.tsx
│   ├── checkout/
│   │   ├── page.tsx                # 3-step checkout flow
│   │   └── success/page.tsx
│   ├── login/
│   │   ├── page.tsx
│   │   └── AuthClient.tsx          # Shared login/signup form
│   ├── signup/page.tsx
│   ├── account/page.tsx
│   ├── about/page.tsx
│   ├── materials/page.tsx
│   ├── fit-guide/page.tsx
│   └── privacy-packaging/page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── AnnouncementBar.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   └── ProductGrid.tsx
│   ├── cart/
│   │   └── CartDrawer.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Accordion.tsx
│       └── Breadcrumb.tsx
│
├── context/
│   └── CartContext.tsx             # Cart state + localStorage
│
├── lib/
│   └── products.ts                 # All product data + helpers
│
└── types/
    └── index.ts                    # TypeScript interfaces
```

---

## Design System

### Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| `--obsidian` | `#0e0d0c` | Page background |
| `--charcoal` | `#1c1a18` | Cards, sections |
| `--walnut` | `#2a2520` | Inputs, image areas |
| `--espresso` | `#3d3530` | Hover states |
| `--bone` | `#c8bfb0` | Primary text |
| `--brass` | `#9a8060` | Accent, CTAs |
| `--text-muted` | `#6b5c4d` | Secondary text |

### Typography
- **Serif**: Cormorant Garamond — headings, editorial, prices
- **Sans**: Jost — interface, body, navigation, labels

---

## Collections & Products

| # | Collection | Products |
|---|-----------|---------|
| 01 | Core | Nocturne Brief, Nocturne Boxer Brief, Obsidian Trunk, Bone Rib Brief |
| 02 | After Dark | Veil Mesh Brief, Veil Mesh Jock, Shadow Sheer Brief, Eclipse Low-Rise Trunk |
| 03 | Resort | Tide Swim Brief, Heatwave Short Trunk |
| 04 | Vault | Midnight Harness Brief, Private Satin Brief |

---

## What's Mocked (Frontend-Only)

| Feature | Status | Notes |
|---------|--------|-------|
| Cart | ✓ Full | localStorage persistence, qty/remove |
| Auth | ✓ Mock | Form renders, redirects to /account |
| Checkout | ✓ Mock | 3-step flow, order confirmation |
| Account | ✓ Static | Mock orders, wishlist, profile |
| Products | ✓ Full | 12 products, all data, specs |
| Filters | ✓ Full | Silhouette filter + sort |

---

## Backend Integration Points

### Authentication
```typescript
// app/login/AuthClient.tsx — replace handleSubmit:
// Recommended: Clerk, NextAuth.js, or Supabase Auth
import { signIn } from 'next-auth/react';
const result = await signIn('credentials', { email, password });
```

### Payments
```typescript
// app/checkout/page.tsx — payment section:
// Recommended: Stripe with PayNow, Visa, Mastercard
import { loadStripe } from '@stripe/stripe-js';
// Mount Stripe Elements in the payment step
```

### Product Data / CMS
```typescript
// lib/products.ts — replace static arrays with:
// Option A: Shopify Storefront API (headless)
// Option B: Sanity CMS + GROQ
// Option C: Supabase / PostgreSQL
const products = await fetch('/api/products').then(r => r.json());
```

### Images
```typescript
// Replace placeholder divs in ProductCard.tsx + ProductClient.tsx:
import Image from 'next/image';
<Image src={product.images[0].url} alt={product.name} fill />
// Recommended: Cloudinary or Vercel Blob for image hosting
```

### Order Management
```typescript
// app/checkout/page.tsx — placeOrder():
const order = await createOrder({ items, shipping, payment });
await sendConfirmationEmail(order); // Resend or SendGrid
router.push(`/checkout/success?order=${order.id}`);
```

### Analytics
```typescript
// app/layout.tsx:
import { Analytics } from '@vercel/analytics/react';
// Add <Analytics /> inside CartProvider
```

---

## Deployment

```bash
# Vercel (recommended — zero config)
npx vercel --prod
```

Required environment variables for full integration:
```env
NEXT_PUBLIC_STRIPE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://gaze.com
NEXTAUTH_SECRET=...
NEXT_PUBLIC_SANITY_PROJECT_ID=...
CLOUDINARY_URL=...
```

---

## Brand Notes

GAZE serves an older, affluent, discreet clientele in Southeast Asia. The design language is intentionally restrained — dark walnut, charcoal, brass — evoking a private members club or tailored outfitter after dark. Every design decision should reinforce: calm, private, precise, expensive.

---

© 2024 GAZE Private Ltd · Bangkok
