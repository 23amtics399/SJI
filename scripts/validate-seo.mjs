/**
 * SJI SEO Validation Script
 *
 * Checks every prerendered HTML file in dist/ and verifies:
 *   - file exists
 *   - <title> present
 *   - meta description present
 *   - canonical present and matches expected URL
 *   - og:title present
 *   - og:description present
 *   - og:url present
 *   - og:image present
 *   - h1 present (in noscript section)
 *   - JSON-LD present where expected
 *   - no localhost URLs
 *   - no file:// URLs
 *   - no .gemini paths
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, '../dist');

const SITE = 'https://sji.one';

const ROUTES = [
  { distPath: 'index.html',                        canonical: `${SITE}/`,                       expectJsonLd: true },
  { distPath: 'products/index.html',               canonical: `${SITE}/products`,               expectJsonLd: false },
  { distPath: 'products/prebase/index.html',       canonical: `${SITE}/products/prebase`,       expectJsonLd: true },
  { distPath: 'products/tempbox/index.html',       canonical: `${SITE}/products/tempbox`,       expectJsonLd: true },
  { distPath: 'products/tools/index.html',         canonical: `${SITE}/products/tools`,         expectJsonLd: true },
  { distPath: 'products/time/index.html',          canonical: `${SITE}/products/time`,          expectJsonLd: true },
  { distPath: 'products/shorty/index.html',        canonical: `${SITE}/products/shorty`,        expectJsonLd: true },
  { distPath: 'products/calc/index.html',          canonical: `${SITE}/products/calc`,          expectJsonLd: true },
  { distPath: 'products/scratchpad/index.html',    canonical: `${SITE}/products/scratchpad`,    expectJsonLd: true },
  { distPath: 'about/index.html',                  canonical: `${SITE}/about`,                  expectJsonLd: false },
  { distPath: 'contact/index.html',                canonical: `${SITE}/contact`,                expectJsonLd: false },
  { distPath: 'privacy/index.html',                canonical: `${SITE}/privacy`,                expectJsonLd: false },
  { distPath: 'terms/index.html',                  canonical: `${SITE}/terms`,                  expectJsonLd: false },
  { distPath: '404.html',                          canonical: null,                             expectJsonLd: false },
];

const CHECKS = {
  title: /<title>[^<]+<\/title>/,
  description: /<meta name="description" content="[^"]+"/,
  ogTitle: /<meta property="og:title" content="[^"]+"/,
  ogDescription: /<meta property="og:description" content="[^"]+"/,
  ogUrl: /<meta property="og:url" content="[^"]+"/,
  ogImage: /<meta property="og:image" content="[^"]+"/,
  h1: /<h1[^>]*>[^<]+<\/h1>/,
};

const FORBIDDEN = ['localhost', '127.0.0.1', 'file://', '.gemini', 'antigravity-ide', 'brain/'];

let passed = 0;
let failed = 0;

for (const route of ROUTES) {
  const filePath = path.join(DIST, route.distPath);
  console.log(`\n📄  dist/${route.distPath}`);

  if (!fs.existsSync(filePath)) {
    console.error(`  ❌  FILE MISSING`);
    failed++;
    continue;
  }

  const html = fs.readFileSync(filePath, 'utf-8');
  let routeFailed = false;

  // Check standard tags (skip OG for 404.html)
  const is404 = route.distPath === '404.html';
  const checksToRun = is404
    ? { title: CHECKS.title, description: CHECKS.description, h1: CHECKS.h1 }
    : CHECKS;

  for (const [key, regex] of Object.entries(checksToRun)) {
    if (regex.test(html)) {
      console.log(`  ✓  ${key}`);
    } else {
      console.error(`  ❌  ${key} MISSING`);
      routeFailed = true;
    }
  }

  // Check canonical matches
  if (route.canonical) {
    const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
    if (!canonicalMatch) {
      console.error(`  ❌  canonical MISSING`);
      routeFailed = true;
    } else if (canonicalMatch[1] !== route.canonical) {
      console.error(`  ❌  canonical MISMATCH: got "${canonicalMatch[1]}", expected "${route.canonical}"`);
      routeFailed = true;
    } else {
      console.log(`  ✓  canonical = ${canonicalMatch[1]}`);
    }
  }

  // Check JSON-LD
  if (route.expectJsonLd) {
    if (html.includes('application/ld+json')) {
      console.log(`  ✓  json-ld`);
    } else {
      console.error(`  ❌  json-ld MISSING`);
      routeFailed = true;
    }
  }

  // Check no forbidden strings
  for (const forbidden of FORBIDDEN) {
    if (html.includes(forbidden)) {
      console.error(`  ❌  FORBIDDEN string found: "${forbidden}"`);
      routeFailed = true;
    }
  }

  if (!routeFailed) {
    console.log(`  ✅  All checks passed`);
    passed++;
  } else {
    failed++;
  }
}

// Check required static assets
console.log(`\n${'─'.repeat(60)}`);
console.log('Checking required static assets in dist/...');
const REQUIRED_ASSETS = [
  'favicon.svg',
  'favicon.ico',
  'apple-touch-icon.png',
  'site.webmanifest',
  'og-image.png',
  'og-image.jpg',
  'robots.txt',
  'sitemap.xml',
];

for (const asset of REQUIRED_ASSETS) {
  const assetPath = path.join(DIST, asset);
  if (fs.existsSync(assetPath) && fs.statSync(assetPath).size > 0) {
    console.log(`  ✓  ${asset} (${fs.statSync(assetPath).size} bytes)`);
  } else {
    console.error(`  ❌  ${asset} MISSING or EMPTY`);
    failed++;
  }
}

// Check sitemap contains all 13 canonical URLs
const sitemapContent = fs.readFileSync(path.join(DIST, 'sitemap.xml'), 'utf-8');
for (const route of ROUTES) {
  if (route.canonical) {
    if (!sitemapContent.includes(`<loc>${route.canonical}</loc>`)) {
      console.error(`  ❌  Sitemap missing canonical: ${route.canonical}`);
      failed++;
    }
  }
}

console.log(`\n${'─'.repeat(60)}`);
console.log(`SEO Validation: ${passed} passed, ${failed} failed`);
if (failed > 0) {
  console.error(`\n❌  ${failed} check(s) failed validation. Fix before deploying.`);
  process.exit(1);
} else {
  console.log(`\n✅  All routes and assets passed SEO validation.`);
}
