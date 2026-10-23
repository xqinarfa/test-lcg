# Project Folder Structure Blueprint: Love Couple Games (LCG)

> **Document Version:** 1.0.0  
> **Target Framework:** Next.js 16 (App Router) • React 19 • TypeScript 6  
> **Architecture Pattern:** Feature-Sectioned Modular UI with Dedicated Tokens & Data Separation  
> **Last Updated:** October 2026  

---

## 1. Structural Overview

Love Couple Games (LCG) is an interactive, high-fidelity digital board game web application designed for couples. The codebase adheres to strict engineering principles:
- **Clean Separation of Concerns:** Application layout, landing page sections, reusable UI primitives, domain types, and static data are strictly separated.
- **YAGNI & Anti-Slop (Ponytail & Antislop-Code):** No speculative abstractions or dead code. Code comments are concise, natural, and explain *why* rather than restating obvious syntax.
- **Zero-Friction Scalability:** Page components are grouped into logical subdomains (`layout`, `sections`, `ui`), preventing cluttered flat folders.

---

## 2. Directory Visualization

```
lcg/
├── app/
│   ├── components/
│   │   ├── layout/               # Global framing and persistent chrome
│   │   │   ├── Header.tsx        # Liquid glassmorphism sticky navigation
│   │   │   └── Footer.tsx        # Legal disclaimers & social links
│   │   ├── sections/             # Page story sections (in order of page appearance)
│   │   │   ├── HeroSection.tsx   # Parallax hero with interactive 3D phone mockup
│   │   │   ├── InsightSection.tsx# Stacked scroll-driven pain point cards
│   │   │   ├── GameplaySection.tsx# Game flow & dual-character 3D tilt preview
│   │   │   ├── FeaturesSection.tsx# 4 core game pillars
│   │   │   ├── CardDeckSection.tsx# 3D interactive stacked card showcase & timer
│   │   │   ├── TestimonialSection.tsx# Verified couple infinite marquee carousel
│   │   │   ├── FaqSection.tsx    # Accessible accordion FAQ
│   │   │   └── OfferSection.tsx  # Final pricing CTA & checkout flow steps
│   │   └── ui/                   # Reusable atomic UI & modal dialogs
│   │       ├── Button.tsx        # Retro 3D tactile button primitive
│   │       ├── CheckoutModal.tsx # Multi-step Doku QRIS / APK checkout modal
│   │       ├── FigmaWaveDivider.tsx# Seamless dual-layer SVG wave divider
│   │       └── MobileStickyBar.tsx# Mobile bottom sticky purchase CTA
│   ├── data/
│   │   └── gameData.ts           # Curated challenge decks, FAQs, testimonials
│   ├── types/
│   │   └── index.ts              # Domain interfaces & payment/modal types
│   ├── favicon.ico
│   ├── globals.css               # Design tokens, keyframe physics, and component styles
│   ├── layout.tsx                # Root HTML document, metadata, and font declarations
│   └── page.tsx                  # Main entry page aggregating sections & state
├── public/
│   └── assets/
│       ├── icons/                # Vector icons
│       └── images/               # High-res card frames, mockups, and logos
├── eslint.config.mjs             # ESLint configuration
├── jsconfig.json                 # Path aliases for JS fallback
├── next.config.mjs               # Next.js compilation settings
├── package.json                  # Dependencies (Next.js 16, React 19, Framer Motion)
├── tsconfig.json                 # TypeScript compiler configuration (@/* paths)
└── Project_Folders_Structure_Blueprint.md # This architecture guide
```

---

## 3. Key Directory Analysis

| Directory | Purpose | Contents & Conventions |
| :--- | :--- | :--- |
| `app/components/layout/` | Structural page boundaries | Top navigation (`Header`) and page closing (`Footer`). Persistent across sections. |
| `app/components/sections/` | Modular landing page sections | Self-contained visual and narrative units (`Hero`, `Insight`, `CardDeck`, etc.). |
| `app/components/ui/` | Reusable primitives & modals | Stateless or focused components (`Button`, `FigmaWaveDivider`, `CheckoutModal`). |
| `app/data/` | Content & game configuration | Single source of truth for challenge cards, testimonials, and FAQs. |
| `app/types/` | TypeScript type contracts | Strict interface definitions (`CardItem`, `ChallengeDeck`, `ModalStep`). |
| `public/assets/images/` | Static media assets | Card frames, character renders, wave SVGs, and brand assets. |

---

## 4. File Placement Patterns

When adding new files or features to the project, adhere strictly to these placement patterns:

```
┌─────────────────────────────────┐
│        Type of File             │ ──►  Target Location
├─────────────────────────────────┤
│ New page section (e.g. Video)   │ ──►  app/components/sections/VideoSection.tsx
│ Reusable button / badge / input │ ──►  app/components/ui/<ComponentName>.tsx
│ Header, Navbar, or Drawer       │ ──►  app/components/layout/<ComponentName>.tsx
│ Static game or text content     │ ──►  app/data/gameData.ts
│ TypeScript model or enum        │ ──►  app/types/index.ts
│ Global design token or style    │ ──►  app/globals.css
│ Image / SVG raster asset        │ ──►  public/assets/images/<kebab-name>.<ext>
└─────────────────────────────────┘
```

---

## 5. Naming and Organization Conventions

### File Naming
- **React Components:** PascalCase (`CardDeckSection.tsx`, `CheckoutModal.tsx`, `Button.tsx`).
- **Data & Utilities:** camelCase (`gameData.ts`, `formatters.ts`).
- **Type Definitions:** camelCase or `index.ts` (`index.ts`).
- **Static Assets:** kebab-case (`card-reward-frame.jpg`, `custom-female.jpg`).

### Component Organization Rule
- Every component defines its TypeScript props interface (`export interface ComponentNameProps`).
- Default exports are used for the main component.
- Internal helper sub-components (e.g., icons) are co-located in the same file if not reused elsewhere.

### Code Comment Hygiene (Antislop-Code)
- **Do not restate the obvious:** Never add `// Button component` or `// Render cards`.
- **Do not write workflow narration:** Avoid `// Step 1: ...`, `// Step 2: ...`.
- **Preserve real engineering rationale:** Keep explanations of audio frequency synthesis, math formulas, or CSS workaround constraints.

---

## 6. Navigation and Development Workflow

### Adding a New Challenge Category
1. Open `app/types/index.ts` and ensure any new fields match `ChallengeDeck` and `CardItem`.
2. Add the category deck in `app/data/gameData.ts` under `challengeDecks`.
3. Provide the card frame background image in `public/assets/images/card-<category>-frame.jpg`.
4. Register category styling in `categoryMetadata` inside `app/components/sections/CardDeckSection.tsx`.

### Adding a New Section to the Landing Page
1. Create `app/components/sections/<NewSection>.tsx`.
2. Import and place inside `<main>` in `app/page.tsx` wrapped in `<div className="reveal-on-scroll">` for smooth scroll entrance.

---

## 7. Build and Output Organization

- **Development Server:** `npm run dev` (powered by Turbopack for sub-second HMR).
- **Production Build:** `npm run build` (outputs optimized static prerendered HTML in `.next`).
- **TypeScript Checking:** Run automatically during `npm run build` or standalone via `npx tsc --noEmit`.

---

## 8. Extension and Evolution

- **Multi-Route Expansion:** If expanding into an authenticated game room or web app, create route folders under `app/play/page.tsx` or `app/account/page.tsx`.
- **Global State Management:** If modal or deck state needs to be accessed deeper in the tree, move state to React Context (`app/context/GameContext.tsx`) without adding heavy external state libraries.

---

## 9. Maintenance Checklist

Whenever updating the codebase:
- [ ] Ensure all dead components or unused data arrays are pruned immediately.
- [ ] Verify that TypeScript compiles cleanly: `npm run build`.
- [ ] Keep comments concise and free of decorative ASCII banners or empty labels.
- [ ] Place files in their designated subdirectories (`layout`, `sections`, `ui`).
