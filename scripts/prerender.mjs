/**
 * SJI Static Prerender Script
 *
 * Generates route-specific static HTML for every public URL so that
 * crawlers, social scrapers and non-JS agents can see real content.
 *
 * Strategy:
 *   1. Run after `vite build` (dist/ already populated with assets)
 *   2. Read the built index.html as the base shell
 *   3. For every route, inject route-specific <head> tags and semantic
 *      body content directly into the shell HTML
 *   4. Write each route to its canonical dist path (e.g. dist/products/prebase/index.html)
 *   5. Also write a 404.html with real SJI styling
 *
 * No puppeteer, no headless browser, no additional runtime dependencies.
 * This script is pure Node.js ESM.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

/* ─── Route definitions ─────────────────────────────────────────────────── */

const SITE = 'https://sji.one';
const OG_IMAGE = `${SITE}/og-image.jpg`;
const TODAY = '2026-10-07';

const PRODUCTS = [
  {
    slug: 'prebase',
    name: 'PreBase',
    tagline: 'AI knowledge-base chatbot builder.',
    description: 'Build AI-powered chatbots from your own documents and knowledge. Add your content, train your assistant, and embed it on any website.',
    category: ['AI', 'Productivity'],
    appUrl: 'https://prebase.sji.one',
    seoTitle: 'PreBase — AI Knowledge Base Chatbot | SJI',
    seoDescription: 'Build an AI chatbot from your own documents and knowledge with PreBase. Upload content, train your assistant and embed it on any website. A product by SJI.',
    features: [
      'Upload PDFs, text files, and web content as knowledge sources',
      'Automatically trained conversational AI assistant',
      'Embeddable chat widget for any website',
    ],
    capabilityDescs: [
      'PreBase ingests your PDFs, text files, and web pages to build a private, searchable knowledge index that powers accurate AI responses.',
      'Once your content is uploaded, PreBase automatically trains a conversational assistant that answers only from your content — no hallucinations from generic AI knowledge.',
      'Deploy your chatbot to any website by adding a single line of embed code. Customize the appearance and conversational tone to match your brand.',
    ],
    useCases: [
      'Customer support chatbots trained on your product documentation',
      'Internal team knowledge assistants',
      'FAQ automation for websites and landing pages',
    ],
  },
  {
    slug: 'tempbox',
    name: 'TempBox',
    tagline: 'Temporary email, no account needed.',
    description: 'Receive emails using a disposable temporary address. Protect your primary inbox from spam, sign-up flows, and one-time verifications.',
    category: ['Privacy', 'Utility'],
    appUrl: 'https://tempbox.sji.one',
    seoTitle: 'TempBox — Temporary Email | SJI',
    seoDescription: 'Get a free disposable temporary email address instantly with TempBox. No sign-up required. Protect your inbox from spam and unwanted emails. A product by SJI.',
    features: [
      'Instant disposable email address — no sign-up required',
      'Receive emails and attachments in real time',
      'Automatically expires after use',
    ],
    capabilityDescs: [
      'TempBox generates a working email address the moment you open it — no registration, no password, no forms. Copy and use immediately.',
      'Emails sent to your TempBox address arrive in real time directly in your browser session, including attachments and HTML content.',
      'Your temporary inbox exists only for the duration of your session. When you close the tab, the address and all received emails are discarded automatically.',
    ],
    useCases: [
      'Signing up for a service without using your real email',
      'Receiving one-time verification codes',
      'Testing email delivery during development',
    ],
  },
  {
    slug: 'tools',
    name: 'Tools',
    tagline: 'Image and PDF utilities in your browser.',
    description: 'A collection of browser-based image and PDF tools. Compress, resize, crop, convert and manipulate files without uploading them to a server.',
    category: ['Utilities', 'Productivity'],
    appUrl: 'https://tools.sji.one',
    seoTitle: 'Tools — Online Image & PDF Utilities | SJI',
    seoDescription: 'Free browser-based image and PDF tools by SJI. Compress, resize, crop images and convert PDFs online — all client-side, no uploads required.',
    features: [
      'Image compression with quality control',
      'Image resizing and cropping',
      'PDF to image conversion',
    ],
    capabilityDescs: [
      'Compress JPEG, PNG and WebP images with fine-grained quality control. Reduce file sizes dramatically while preserving visual fidelity — all processed locally in your browser.',
      'Resize and crop images to exact pixel dimensions, maintaining aspect ratio or cropping to a custom region. Supports batch processing of multiple files at once.',
      'Convert PDF pages to individual images, or combine multiple images into a single PDF document. Every operation runs client-side — your files never leave your device.',
    ],
    useCases: [
      'Reducing image file sizes before uploading to a website',
      'Extracting pages from a PDF as images',
      'Preparing images for social media and email',
    ],
  },
  {
    slug: 'time',
    name: 'Time',
    tagline: 'Clocks, timers, stopwatch and alarms.',
    description: 'A complete set of time utilities in one place. Digital and analog clocks, world clock, stopwatch, countdown timer, Pomodoro timer and alarm.',
    category: ['Utilities'],
    appUrl: 'https://time.sji.one',
    seoTitle: 'Time — Online Clocks, Timers & Stopwatch | SJI',
    seoDescription: 'Free online time tools by SJI. Digital clock, world clock, stopwatch, countdown timer, Pomodoro timer and alarm — all in one place.',
    features: [
      'Digital and analog clock display',
      'World clock with multiple time zones',
      'Stopwatch with lap recording',
    ],
    capabilityDescs: [
      'Display the current time in digital or analog format. Add multiple time zones to the world clock panel to compare times across locations at a glance — useful for distributed teams.',
      'Track elapsed time with the stopwatch, including named lap splits. The countdown timer counts down from any custom duration with a configurable alert when time is up.',
      'The Pomodoro timer implements the standard 25-minute focus / 5-minute break cycle. Set browser alarms for any time using the Web Notifications API, even when the tab is in the background.',
    ],
    useCases: [
      'Tracking time during focused work or study sessions',
      'Coordinating across time zones with distributed teams',
      'Using Pomodoro technique for productivity',
    ],
  },
  {
    slug: 'shorty',
    name: 'Shorty',
    tagline: 'Simple URL shortening.',
    description: 'Shorten long URLs into clean, shareable links. Fast, simple and developer-friendly.',
    category: ['Utility', 'Developer'],
    appUrl: 'https://shorty.sji.one',
    seoTitle: 'Shorty — URL Shortener | SJI',
    seoDescription: 'Free URL shortener by SJI. Paste a long URL and get a short, clean link instantly. Simple, fast and developer-friendly.',
    features: [
      'Instant URL shortening',
      'Clean, memorable short links',
      'Copy to clipboard with one click',
    ],
    capabilityDescs: [
      'Paste any long URL and receive a short Shorty link within milliseconds. No account, no configuration — just paste and copy the result.',
      'Shorty links are clean, consistent and human-readable. They fit naturally in emails, social posts, documentation and printed materials without the noise of tracking parameters.',
      'Copy your shortened link to the clipboard with a single click. Shorty keeps a session history of links you have created so you can retrieve them without re-shortening.',
    ],
    useCases: [
      'Sharing long URLs on social media or in messages',
      'Cleaning up affiliate or tracking links',
      'Creating compact links for print or presentations',
    ],
  },
  {
    slug: 'calc',
    name: 'Calc',
    tagline: 'Fast everyday calculations.',
    description: 'A clean, fast online calculator for everyday arithmetic. Simple to use, keyboard-friendly, always available in your browser.',
    category: ['Utility'],
    appUrl: 'https://calc.sji.one',
    seoTitle: 'Calc — Online Calculator | SJI',
    seoDescription: 'Free online calculator by SJI. Fast, clean and keyboard-friendly. Perfect for everyday arithmetic and percentage calculations.',
    features: [
      'Basic arithmetic operations',
      'Percentage calculations',
      'Full keyboard support',
    ],
    capabilityDescs: [
      'Perform addition, subtraction, multiplication, division and percentage calculations instantly. Supports brackets for correct order of operations and maintains a calculation history you can scroll through.',
      'Every function in Calc is accessible from your keyboard. Number keys, operators, Enter to evaluate, Backspace to delete, Escape to clear — as fast as a physical calculator without leaving the browser.',
      'Calc runs entirely in your browser with no network requests after the initial load. It continues working offline, making it reliable in environments with intermittent connectivity.',
    ],
    useCases: [
      'Quick arithmetic without leaving the browser',
      'Calculating percentages for discounts and tips',
      'Basic financial calculations',
    ],
  },
  {
    slug: 'scratchpad',
    name: 'Scratchpad',
    tagline: 'A browser-based writing workspace.',
    description: 'A distraction-free writing and note-taking space in your browser. No account, no syncing — just write.',
    category: ['Productivity'],
    appUrl: 'https://scratchpad.sji.one',
    seoTitle: 'Scratchpad — Online Writing Workspace | SJI',
    seoDescription: 'Free browser-based scratchpad by SJI. A distraction-free writing workspace that auto-saves to your browser. No account required.',
    features: [
      'Distraction-free writing environment',
      'Auto-saves to browser local storage',
      'No account or sign-in required',
    ],
    capabilityDescs: [
      'A clean, minimal writing environment with no toolbars, no sidebars, no notifications. Just a blank space and your words — designed to disappear and let you focus.',
      'Your content is saved automatically to your browser\'s local storage as you type. No save button, no sync delay — when you reopen Scratchpad, your previous text is exactly where you left it.',
      'Scratchpad requires no account, no sign-in and no internet connection after the initial load. Export your content as plain text when you need to take it elsewhere.',
    ],
    useCases: [
      'Quickly capturing thoughts and ideas',
      'Drafting emails or messages before sending',
      'Temporary note-taking during research',
    ],
  },
];

/* ─── Route manifest ─────────────────────────────────────────────────────── */

function buildRoutes() {
  const routes = [
    {
      path: '/',
      distPath: 'index.html',
      title: 'SJI — Web Products for Everyday Work',
      description: 'SJI is an ecosystem of focused web products: AI knowledge bases, temporary email, image utilities, URL shortening, time tools and writing spaces. Free to use.',
      canonical: `${SITE}/`,
      h1: 'Simple products for everyday work.',
      bodyContent: `
        <section>
          <h1>Simple products for everyday work.</h1>
          <p>SJI is a collection of focused web products — each built to solve a specific task well. No accounts, no clutter. Open and use.</p>
          <nav aria-label="Products">
            ${PRODUCTS.map(p => `<a href="/products/${p.slug}">${p.name} — ${p.tagline}</a>`).join('\n            ')}
          </nav>
          <section>
            <h2>What SJI makes</h2>
            <p>Seven focused web products, each built around a clear purpose.</p>
          </section>
          <section>
            <h2>Focused by design</h2>
            <p>SJI products are built around a simple principle: software should solve the task in front of you without unnecessary complexity.</p>
            <ul>
              <li><strong>Focused</strong> — Each product does one thing. No bundled features, no upsell tiers.</li>
              <li><strong>Useful</strong> — Tools that solve real problems quickly. Open the product, do the task, move on.</li>
              <li><strong>Accessible</strong> — Free to use, no mandatory accounts, works in any modern browser.</li>
            </ul>
          </section>
          <p><a href="/products">Browse all SJI products</a> | <a href="/about">About SJI</a></p>
        </section>`,
      jsonLd: JSON.stringify([
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'SJI',
          url: SITE,
          description: 'SJI is a collection of focused web products built around practical everyday needs.',
        },
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'SJI',
          url: SITE,
          description: 'Simple tools for everyday work.',
        },
      ]),
    },
    {
      path: '/products',
      distPath: 'products/index.html',
      title: 'SJI Products — Focused Web Applications & Utilities',
      description: 'Browse all SJI web products: AI knowledge-base chatbot builder, disposable temporary email, client-side image and PDF utilities, time tracking, URL shortening, calculators, and offline writing workspace.',
      canonical: `${SITE}/products`,
      h1: 'SJI Products',
      bodyContent: `
        <section>
          <h1>SJI Products</h1>
          <p>Seven focused web products, available directly in your browser.</p>
          <ul>
            ${PRODUCTS.map(p => `<li><a href="/products/${p.slug}"><strong>${p.name}</strong> — ${p.tagline}</a><br>${p.description}</li>`).join('\n            ')}
          </ul>
          <section>
            <h2>About SJI products</h2>
            <p>Every SJI product is an independent web application built around a single, focused purpose. Rather than building one large platform that tries to do everything, SJI takes the approach of building separate, lightweight web products that each solve a specific task with excellence.</p>
            <p>All SJI products are free to use. No mandatory accounts. No installation required.</p>
          </section>
        </section>`,
      jsonLd: null,
    },
    {
      path: '/about',
      distPath: 'about/index.html',
      title: 'About SJI — Software Designed to Stay Out of Your Way',
      description: 'SJI is a collection of focused web products built around practical everyday needs. Each product solves a single task simply and quickly.',
      canonical: `${SITE}/about`,
      h1: 'Software designed to stay out of your way.',
      bodyContent: `
        <section>
          <h1>Software designed to stay out of your way.</h1>
          <p>SJI is a public collection of focused web products built around practical everyday needs.</p>
          <section>
            <h2>What is SJI?</h2>
            <p>SJI is a platform of independent web products. Each product is a focused web application that does one thing and does it well. The products span practical everyday needs — temporary email, image and PDF tools, time tracking, URL shortening, calculation, writing space — and more complex products like AI-powered knowledge base tooling.</p>
            <p>Every SJI product shares a common design principle: the product should get out of your way and let you do the thing you came to do. No feature bloat, no unnecessary sign-up flows, no dark patterns.</p>
          </section>
          <section>
            <h2>The core design principle</h2>
            <p>The consistent thread across all SJI products is restraint. Adding features is easy. Deciding what not to include — what to deliberately leave out — is harder and more valuable.</p>
          </section>
          <nav>
            <h2>SJI Products</h2>
            ${PRODUCTS.map(p => `<a href="/products/${p.slug}">${p.name}</a>`).join(' · ')}
          </nav>
        </section>`,
      jsonLd: null,
    },
    {
      path: '/privacy',
      distPath: 'privacy/index.html',
      title: 'Privacy Policy — SJI',
      description: 'Privacy policy for SJI and all SJI products including PreBase, TempBox, Tools, Time, Shorty, Calc and Scratchpad.',
      canonical: `${SITE}/privacy`,
      h1: 'Privacy Policy',
      bodyContent: `
        <section>
          <h1>Privacy Policy</h1>
          <p>Last updated: 2025.</p>
          <p>SJI is a collection of web products operated under the domain sji.one. This policy describes how SJI handles data across its products.</p>
          <h2>Client-side products</h2>
          <p>Several SJI products run entirely in your browser — including Tools, Calc, Time and Scratchpad. For these products, your files, inputs and data never leave your device.</p>
          <h2>Server-side products</h2>
          <p>Products that require server infrastructure — such as TempBox and PreBase — process data on SJI servers to deliver their functionality. Only the minimum necessary data is processed.</p>
          <h2>Cookies</h2>
          <p>SJI uses minimal cookies. No tracking cookies or third-party advertising cookies are used on SJI properties.</p>
          <p><a href="/contact">Contact us</a> | <a href="/terms">Terms of Use</a></p>
        </section>`,
      jsonLd: null,
    },
    {
      path: '/terms',
      distPath: 'terms/index.html',
      title: 'Terms of Use — SJI',
      description: 'Terms of use for SJI and all SJI products. Read the rules that govern your use of SJI web products.',
      canonical: `${SITE}/terms`,
      h1: 'Terms of Use',
      bodyContent: `
        <section>
          <h1>Terms of Use</h1>
          <p>Last updated: 2025.</p>
          <p>By using any SJI product or visiting sji.one, you agree to these terms.</p>
          <h2>Use of SJI products</h2>
          <p>SJI products are provided for lawful personal and professional use. You may not use SJI products to facilitate illegal activity or abuse SJI infrastructure.</p>
          <h2>No warranty</h2>
          <p>SJI products are provided "as is" without warranty of any kind.</p>
          <p><a href="/contact">Contact us</a> | <a href="/privacy">Privacy Policy</a></p>
        </section>`,
      jsonLd: null,
    },
    {
      path: '/contact',
      distPath: 'contact/index.html',
      title: 'Contact — SJI',
      description: 'Get in touch with SJI. For general enquiries, product feedback, bug reports or other questions, contact us by email.',
      canonical: `${SITE}/contact`,
      h1: 'Contact',
      bodyContent: `
        <section>
          <h1>Contact</h1>
          <p>For general enquiries, product feedback or bug reports.</p>
          <h2>Get in touch</h2>
          <p>For general enquiries, feedback about a specific product or to report a bug, reach us by email. We read every message.</p>
          <h2>Product-specific feedback</h2>
          <ul>
            ${PRODUCTS.map(p => `<li><a href="/products/${p.slug}">${p.name}</a></li>`).join('\n            ')}
          </ul>
          <p><a href="/">Back to SJI</a> | <a href="/products">All products</a></p>
        </section>`,
      jsonLd: null,
    },
  ];

  // Add product detail routes
  for (const product of PRODUCTS) {
    routes.push({
      path: `/products/${product.slug}`,
      distPath: `products/${product.slug}/index.html`,
      title: product.seoTitle,
      description: product.seoDescription,
      canonical: `${SITE}/products/${product.slug}`,
      h1: product.name,
      bodyContent: `
        <section>
          <nav aria-label="Breadcrumb">
            <a href="/">SJI</a> / <a href="/products">Products</a> / ${product.name}
          </nav>
          <h1>${product.name}</h1>
          <p class="tagline">${product.tagline}</p>
          <p>${product.description}</p>
          <p><a href="${product.appUrl}" rel="noopener noreferrer">Open ${product.name}</a></p>
          <section>
            <h2>Key Capabilities</h2>
            <ol>
              ${product.features.slice(0, 3).map((feat, i) => `<li><strong>${feat}</strong><br>${product.capabilityDescs[i]}</li>`).join('\n              ')}
            </ol>
          </section>
          <section>
            <h2>Who it is for</h2>
            <ul>
              ${product.useCases.map(uc => `<li>${uc}</li>`).join('\n              ')}
            </ul>
          </section>
          <p><a href="/products">All SJI Products</a> | <a href="/">SJI Homepage</a></p>
        </section>`,
      jsonLd: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: product.name,
        description: product.description,
        applicationCategory: 'WebApplication',
        url: product.appUrl,
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        operatingSystem: 'Any',
        isPartOf: { '@type': 'WebSite', name: 'SJI', url: SITE },
      }),
    });
  }

  return routes;
}

/* ─── HTML shell builder ──────────────────────────────────────────────────── */

function buildHeadTags(route) {
  const jsonLdStr = route.jsonLd
    ? (Array.isArray(JSON.parse(route.jsonLd))
        ? JSON.parse(route.jsonLd).map(d => `<script type="application/ld+json">${JSON.stringify(d)}</script>`).join('\n    ')
        : `<script type="application/ld+json">${route.jsonLd}</script>`)
    : '';

  return `
    <title>${escHtml(route.title)}</title>
    <meta name="description" content="${escAttr(route.description)}" />
    <link rel="canonical" href="${escAttr(route.canonical)}" />
    <meta property="og:title" content="${escAttr(route.title)}" />
    <meta property="og:description" content="${escAttr(route.description)}" />
    <meta property="og:url" content="${escAttr(route.canonical)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="SJI" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escAttr(route.title)}" />
    <meta name="twitter:description" content="${escAttr(route.description)}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />
    ${jsonLdStr}`.trim();
}

function escHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function escAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

/* ─── Noscript fallback body ─────────────────────────────────────────────── */

function buildNoScriptSection(route) {
  return `
  <noscript>
    <div style="font-family:system-ui,sans-serif;max-width:900px;margin:2rem auto;padding:0 1.5rem">
      ${route.bodyContent}
    </div>
  </noscript>`.trim();
}

/* ─── Main ──────────────────────────────────────────────────────────────────*/

function main() {
  // Read base shell built by Vite
  const shellPath = path.join(DIST, 'index.html');
  if (!fs.existsSync(shellPath)) {
    console.error('❌  dist/index.html not found. Run `npm run build` first.');
    process.exit(1);
  }
  const shell = fs.readFileSync(shellPath, 'utf-8');

  const routes = buildRoutes();
  const injectedRoutes = [];

  for (const route of routes) {
    // Build route-specific head tags
    const headTags = buildHeadTags(route);

    // Replace the default <title> and <link rel="canonical"> in the shell
    // Insert our route-specific tags right before </head>
    let html = shell
      // Remove existing title
      .replace(/<title>[^<]*<\/title>/, '')
      // Remove existing canonical
      .replace(/<link rel="canonical"[^>]*\/?>/, '')
      // Remove existing og:title / og:description / og:url / og:image meta tags
      .replace(/<meta property="og:[^"]*"[^>]*\/?>/g, '')
      // Remove existing twitter meta tags
      .replace(/<meta name="twitter:[^"]*"[^>]*\/?>/g, '')
      // Remove existing description meta
      .replace(/<meta name="description"[^>]*\/?>/, '');

    // Inject our head tags before </head>
    html = html.replace('</head>', `  ${headTags}\n  </head>`);

    // Inject noscript semantic content before </body>
    const noScript = buildNoScriptSection(route);
    html = html.replace('</body>', `  ${noScript}\n  </body>`);

    // Write to dist
    const outPath = path.join(DIST, route.distPath);
    const outDir = path.dirname(outPath);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(outPath, html, 'utf-8');
    console.log(`✓  ${route.canonical}  →  dist/${route.distPath}`);

    // Also write flat .html file (e.g. dist/products.html, dist/products/prebase.html)
    if (route.distPath !== 'index.html' && route.distPath.endsWith('/index.html')) {
      const flatRel = route.distPath.replace(/\/index\.html$/, '.html');
      const flatPath = path.join(DIST, flatRel);
      fs.writeFileSync(flatPath, html, 'utf-8');
    }

    injectedRoutes.push(route.canonical);
  }

  // Write 404.html
  write404(shell);

  console.log(`\n✅  Prerendered ${injectedRoutes.length} routes + 404.html`);
}

function write404(shell) {
  const route = {
    title: 'Page Not Found — SJI',
    description: 'The page you are looking for does not exist. Browse all SJI web products.',
    canonical: `${SITE}/`,
    bodyContent: `
      <section>
        <h1>404 — Page not found</h1>
        <p>The page you are looking for does not exist or has been moved.</p>
        <p><a href="/">Go to SJI homepage</a> | <a href="/products">Browse products</a></p>
      </section>`,
    jsonLd: null,
  };

  const headTags = `
    <title>Page Not Found — SJI</title>
    <meta name="description" content="The page you are looking for does not exist. Browse all SJI web products." />
    <meta name="robots" content="noindex, follow" />
    <link rel="canonical" href="${SITE}/" />`.trim();

  let html = shell
    .replace(/<title>[^<]*<\/title>/, '')
    .replace(/<link rel="canonical"[^>]*\/?>/, '')
    .replace(/<meta property="og:[^"]*"[^>]*\/?>/g, '')
    .replace(/<meta name="twitter:[^"]*"[^>]*\/?>/g, '')
    .replace(/<meta name="description"[^>]*\/?>/, '');

  html = html.replace('</head>', `  ${headTags}\n  </head>`);

  const noScript = `
  <noscript>
    <div style="font-family:system-ui,sans-serif;max-width:900px;margin:2rem auto;padding:0 1.5rem">
      ${route.bodyContent}
    </div>
  </noscript>`;
  html = html.replace('</body>', `${noScript}\n  </body>`);

  const outPath = path.join(DIST, '404.html');
  fs.writeFileSync(outPath, html, 'utf-8');
  console.log(`✓  404.html  →  dist/404.html`);
}

main();
