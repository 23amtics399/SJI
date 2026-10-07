/**
 * Remote HTTP Verification Script
 * Tests all public endpoints against https://sji.one
 */

const BASE = 'https://sji.one';

const ROUTES_TO_TEST = [
  '/',
  '/products',
  '/products/prebase',
  '/products/tempbox',
  '/products/tools',
  '/products/time',
  '/products/shorty',
  '/products/calc',
  '/products/scratchpad',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
];

async function testUrl(url, opts = {}) {
  try {
    const res = await fetch(url, {
      ...opts,
      redirect: 'manual',
      signal: AbortSignal.timeout(8000),
    });
    return {
      status: res.status,
      contentType: res.headers.get('content-type') || '',
      location: res.headers.get('location') || '',
      text: opts.method === 'HEAD' ? '' : await res.text(),
    };
  } catch (err) {
    return { error: err.message };
  }
}

async function run() {
  console.log('Testing Live Endpoints on:', BASE);
  console.log('='.repeat(70));

  // 1. Test HTML routes
  console.log('\n--- 1. Testing HTML Routes ---');
  for (const r of ROUTES_TO_TEST) {
    const url = `${BASE}${r}`;
    const result = await testUrl(url);
    if (result.error) {
      console.log(`❌  ${r} -> ERROR: ${result.error}`);
      continue;
    }

    const titleMatch = result.text.match(/<title>([^<]+)<\/title>/);
    const title = titleMatch ? titleMatch[1] : 'NO TITLE';
    const canonMatch = result.text.match(/<link rel="canonical" href="([^"]+)"/);
    const canon = canonMatch ? canonMatch[1] : 'NO CANONICAL';
    const hasNoscript = result.text.includes('<noscript>');

    console.log(
      `Status ${result.status} | ${r.padEnd(22)} | Canonical: ${canon} | Title: ${title.slice(0, 35)}... | Pre-rendered: ${hasNoscript ? 'YES' : 'NO'}`
    );
  }

  // 2. Trailing slashes
  console.log('\n--- 2. Testing Trailing Slashes ---');
  for (const r of ['/products/', '/products/prebase/', '/about/']) {
    const url = `${BASE}${r}`;
    const result = await testUrl(url, { method: 'HEAD' });
    console.log(
      `${r.padEnd(22)} -> Status ${result.status} | Location: ${result.location || 'none'}`
    );
  }

  // 3. 404 behavior
  console.log('\n--- 3. Testing 404 Behavior ---');
  for (const r of ['/does-not-exist', '/products/not-real-product']) {
    const url = `${BASE}${r}`;
    const result = await testUrl(url);
    console.log(
      `${r.padEnd(25)} -> Status ${result.status} | Content-Type: ${result.contentType}`
    );
  }

  // 4. Static assets
  console.log('\n--- 4. Testing Static Assets ---');
  const assets = [
    '/favicon.svg',
    '/favicon.ico',
    '/apple-touch-icon.png',
    '/site.webmanifest',
    '/og-image.png',
    '/og-image.jpg',
    '/robots.txt',
    '/sitemap.xml',
  ];
  for (const a of assets) {
    const url = `${BASE}${a}`;
    const result = await testUrl(url, { method: 'HEAD' });
    console.log(
      `${a.padEnd(25)} -> Status ${result.status} | Content-Type: ${result.contentType}`
    );
  }
}

run();
