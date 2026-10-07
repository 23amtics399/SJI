import fs from 'fs';

const testRoutes = [
  { path: 'dist/index.html', name: 'Homepage (/)' },
  { path: 'dist/products/index.html', name: 'Products (/products)' },
  { path: 'dist/products/prebase/index.html', name: 'PreBase (/products/prebase)' },
  { path: 'dist/about/index.html', name: 'About (/about)' },
  { path: 'dist/404.html', name: '404 (/404.html)' }
];

for (const t of testRoutes) {
  console.log('='.repeat(60));
  console.log('PAGE:', t.name);
  const html = fs.readFileSync(t.path, 'utf8');
  const title = (html.match(/<title>([^<]+)<\/title>/) || [])[1];
  const desc = (html.match(/<meta name="description" content="([^"]+)"/) || [])[1];
  const canon = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  const h1 = (html.match(/<h1[^>]*>([^<]+)<\/h1>/) || [])[1];
  const hasJsonLd = html.includes('application/ld+json');
  const noscript = (html.match(/<noscript>([\s\S]*?)<\/noscript>/) || [])[1];

  console.log('Title:     ', title);
  console.log('Canonical: ', canon);
  console.log('H1:        ', h1);
  console.log('JSON-LD:   ', hasJsonLd ? 'YES' : 'NONE');
  console.log('Noscript sample:', noscript ? noscript.trim().slice(0, 150).replace(/\s+/g, ' ') + '...' : 'NONE');
}
