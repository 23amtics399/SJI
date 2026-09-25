import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';
import JsonLd from '../components/JsonLd';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';

const ORG_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SJI',
  url: 'https://sji.one',
  description:
    'SJI is a collection of focused web products built around practical everyday needs.',
};

const WEBSITE_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'SJI',
  url: 'https://sji.one',
  description: 'Simple tools for everyday work.',
};

// Pick products to feature in the hero visual composition
const heroVisualProducts = PRODUCTS.filter(
  (p) => p.previewImage && p.status === 'live'
).slice(0, 3);

// Data-driven featured product (set in products.ts via featured: true)
const featuredProduct = PRODUCTS.find((p) => p.featured) ?? PRODUCTS[0];

export default function HomePage() {
  return (
    <>
      <SEO
        title="SJI — Web Products for Everyday Work"
        description="SJI is an ecosystem of focused web products: AI knowledge bases, temporary email, image utilities, URL shortening, time tools and writing spaces. Free to use."
        canonical="https://sji.one/"
      />
      <JsonLd data={ORG_JSONLD} id="jsonld-org" />
      <JsonLd data={WEBSITE_JSONLD} id="jsonld-website" />

      {/* ── Hero ── */}
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero__inner">
          <div className="hero__layout">
            {/* Left: copy */}
            <div className="hero__copy">
              <p className="hero__label">SJI Product Ecosystem</p>
              <h1 className="hero__heading" id="hero-heading">
                Simple products for everyday work.
              </h1>
              <p className="hero__sub">
                A collection of focused web products — each built to solve a specific
                task well. No accounts, no clutter. Open and use.
              </p>
              <div className="hero__actions">
                <Link to="/products" className="btn btn--primary btn--lg">
                  Browse products
                  <ArrowRight size={15} />
                </Link>
                <Link to="/about" className="btn btn--ghost btn--lg">
                  About SJI
                </Link>
              </div>
            </div>

            {/* Right: product visual collage */}
            {heroVisualProducts.length > 0 && (
              <div className="hero__visual" aria-hidden="true">
                <div className="hero__visual-stack">
                  {heroVisualProducts[0] && (
                    <div className="hero__visual-card hero__visual-card--large">
                      <img
                        src={heroVisualProducts[0].previewImage!}
                        alt={`${heroVisualProducts[0].name} preview`}
                        className="hero__visual-img"
                        loading="eager"
                      />
                      <p className="hero__visual-label">{heroVisualProducts[0].name}</p>
                    </div>
                  )}
                  {heroVisualProducts[1] && (
                    <div className="hero__visual-card hero__visual-card--secondary">
                      <img
                        src={heroVisualProducts[1].previewImage!}
                        alt={`${heroVisualProducts[1].name} preview`}
                        className="hero__visual-img"
                        loading="lazy"
                      />
                      <p className="hero__visual-label">{heroVisualProducts[1].name}</p>
                    </div>
                  )}
                  {heroVisualProducts[2] && (
                    <div className="hero__visual-card hero__visual-card--tertiary">
                      <img
                        src={heroVisualProducts[2].previewImage!}
                        alt={`${heroVisualProducts[2].name} preview`}
                        className="hero__visual-img"
                        loading="lazy"
                      />
                      <p className="hero__visual-label">{heroVisualProducts[2].name}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Product wall ── */}
      <section className="section" aria-labelledby="products-heading">
        <div className="container">
          <div className="section-header--row">
            <div>
              <p className="eyebrow">Products</p>
              <h2 id="products-heading" className="section-title">
                What SJI makes.
              </h2>
              <p className="section-sub">
                Seven focused web products, each built around a clear purpose.
              </p>
            </div>
            <Link to="/products" className="btn btn--ghost">
              All products <ArrowRight size={14} />
            </Link>
          </div>

          <div className="pcard-grid">
            {PRODUCTS.map((product, i) => (
              <ProductCard
                key={product.slug}
                product={product}
                variant="preview"
                animIndex={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured product spotlight ── */}
      {featuredProduct.previewImage && (
        <section className="featured-product section--alt" aria-labelledby="featured-heading">
          <div className="container">
            <div className="featured-product__inner">
              {/* Left: copy */}
              <div>
                <div className="featured-product__icon">
                  {featuredProduct.icon ? (
                    <img
                      src={featuredProduct.icon}
                      alt=""
                      aria-hidden="true"
                      width={24}
                      height={24}
                      style={{ width: 24, height: 24, objectFit: 'contain' }}
                    />
                  ) : null}
                </div>
                <p className="featured-product__label">Featured product</p>
                <h2 id="featured-heading" className="featured-product__name">
                  {featuredProduct.name}
                </h2>
                <p className="featured-product__desc">
                  {featuredProduct.description}
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <Link
                    to={`/products/${featuredProduct.slug}`}
                    className="btn btn--primary"
                  >
                    Learn more
                  </Link>
                  <a
                    href={featuredProduct.appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--ghost"
                  >
                    Open product <ExternalLink size={13} />
                  </a>
                </div>
              </div>

              {/* Right: browser mockup with screenshot */}
              <div className="featured-product__screenshot">
                <div className="featured-product__browser">
                  <div className="featured-product__browser-bar">
                    <span className="featured-product__browser-dot" />
                    <span className="featured-product__browser-dot" />
                    <span className="featured-product__browser-dot" />
                  </div>
                  <img
                    src={featuredProduct.screenshots[1] || featuredProduct.previewImage}
                    alt={`${featuredProduct.name} dashboard`}
                    className="featured-product__browser-img"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Philosophy ── */}
      <section className="section section--border-top" aria-labelledby="philosophy-heading">
        <div className="container">
          <div className="section-header">
            <h2 id="philosophy-heading" className="section-title">Focused by design.</h2>
            <p className="section-sub">
              SJI products are built around a simple principle: software should solve the
              task in front of you without unnecessary complexity.
            </p>
          </div>

          <div className="principles">
            <div className="principle">
              <p className="principle__label">Focused</p>
              <p className="principle__text">
                Each product does one thing. No bundled features, no upsell tiers, no
                subscription walls on core functionality.
              </p>
            </div>
            <div className="principle">
              <p className="principle__label">Useful</p>
              <p className="principle__text">
                Tools that solve real problems quickly. Open the product, do the task,
                move on. That's the entire goal.
              </p>
            </div>
            <div className="principle">
              <p className="principle__label">Accessible</p>
              <p className="principle__text">
                Free to use, no mandatory accounts, works in any modern browser. Where
                possible, processing stays on your device.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quick launch row ── */}
      <section className="section section--alt section--border-top" aria-labelledby="open-heading">
        <div className="container">
          <div className="section-header--row">
            <div>
              <h2 id="open-heading" className="section-title">Open a product now.</h2>
              <p className="section-sub">No sign-up. No download. Works in your browser.</p>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1px',
              background: 'var(--border)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-lg)',
              overflow: 'hidden',
            }}
          >
            {PRODUCTS.filter((p) => p.status === 'live').map((product) => (
              <a
                key={product.slug}
                href={product.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${product.name}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem 1.25rem',
                  background: 'var(--bg-raised)',
                  color: 'var(--text)',
                  transition: 'background 200ms ease',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-subtle)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--bg-raised)')}
              >
                {product.icon ? (
                  <img
                    src={product.icon}
                    alt=""
                    aria-hidden="true"
                    width={16}
                    height={16}
                    style={{ width: 16, height: 16, objectFit: 'contain', flexShrink: 0 }}
                  />
                ) : null}
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text)' }}>
                  {product.name}
                </span>
                <ExternalLink size={12} style={{ marginLeft: 'auto', color: 'var(--text-3)', flexShrink: 0 }} />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
