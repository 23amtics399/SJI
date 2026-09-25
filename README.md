# SJI

A public ecosystem of focused, independent web products designed to solve everyday tasks with speed, privacy, and simplicity.

Every product on SJI is built around a single, clear purpose — staying out of your way and letting you get things done without unnecessary sign-up walls, telemetry, or feature bloat.

## Products

| Product | Description | Public URL |
| :--- | :--- | :--- |
| **PreBase** | AI knowledge-base chatbot builder | [prebase.sji.one](https://prebase.sji.one) |
| **TempBox** | Disposable temporary email without sign-up | [tempbox.sji.one](https://tempbox.sji.one) |
| **Tools** | Client-side online image and PDF utilities | [tools.sji.one](https://tools.sji.one) |
| **Time** | Clocks, timers, stopwatch, and alarms | [time.sji.one](https://time.sji.one) |
| **Shorty** | Clean, fast URL shortening | [shorty.sji.one](https://shorty.sji.one) |
| **Calc** | Keyboard-friendly everyday calculations | [calc.sji.one](https://calc.sji.one) |
| **Scratchpad** | Distraction-free, auto-saving writing workspace | [scratchpad.sji.one](https://scratchpad.sji.one) |

## Tech Stack

- **Core**: React 19, TypeScript
- **Bundler & Tooling**: Vite 8
- **Routing**: React Router 7 (Single Page Application)
- **Styling**: Vanilla CSS (Custom design tokens, light & dark theme system)
- **Typography**: Self-hosted Inter font (`@fontsource/inter`)
- **SEO & Structured Data**: Dynamic metadata tags, Open Graph, canonical URLs, and schema.org JSON-LD

## Development

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

## Production Build

Create an optimized production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
SJI/
├── public/                  # Static assets
│   ├── products/            # Real product icons, screenshots, and visual assets
│   ├── favicon.svg          # SJI brand mark
│   ├── robots.txt           # Search engine crawler directives
│   └── sitemap.xml          # Canonical XML sitemap with all public routes
├── src/
│   ├── components/          # Reusable UI components (ProductCard, ProductPreview, SEO, Header, Footer)
│   ├── data/                # Product data definitions and specifications
│   ├── pages/               # Route pages (Home, Products, ProductDetail, About, Privacy, Terms, Contact)
│   ├── App.tsx              # Root component with routing and theme providers
│   ├── index.css            # Design system, CSS tokens, and component styles
│   └── main.tsx             # Application entry point
├── index.html               # Main HTML template
├── vercel.json              # Production SPA routing configuration
├── vite.config.ts           # Vite build configuration
└── tsconfig.json            # TypeScript configuration
```

## Deployment

The production site is configured for standard static/SPA hosting on [Vercel](https://vercel.com) via `vercel.json` with client-side rewrites to `index.html`.
