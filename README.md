# MrSniperV Portfolio
https://mrsniperv-portfolio.vercel.app/
A modern, dark, highly animated personal portfolio website for **MrSniperV** — Backend & Full-Stack Developer.

Built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **React Three Fiber**.

## Features

- Cinematic loading screen with brand logo animation
- Sticky minimal navbar with interactive logo
- Hero section with 3D wireframe scene and mouse parallax
- Animated skills orbit (simplified grid on mobile)
- Experience timeline, education, and project cards
- Custom desktop cursor (disabled on mobile)
- `prefers-reduced-motion` support
- Lazy-loaded Three.js scene
- SEO metadata and PWA manifest
- Official MrSniperV logo across navbar, hero, loader, footer, and favicons

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js / React Three Fiber

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Generate logo assets

After placing your logo source image in the project root (`logo-source.png`), run:

```bash
npm run generate-icons
```

This creates transparent PNG, monochrome PNG, optimized WebP, mobile WebP, SVG wrapper, favicons, and PWA icons in `public/`.

### Development

```bash
npm run dev
```

https://mrsniperv-portfolio.vercel.app/

### Production build

```bash
npm run build
npm start
```

## Brand Colors

| Token | Value |
|-------|-------|
| Background | `#050505` |
| Surface | `#111111` |
| Text | `#F5F5F5` |
| Secondary Text | `#A5A5A5` |
| Accent | `#9333EA` |

## License

© 2026 MrSniperV. All Rights Reserved.
