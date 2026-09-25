import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';
import ProductCard, { ProductRealIcon } from '../components/ProductCard';
import ProductPreview from '../components/ProductPreview';
import { PRODUCTS } from '../data/products';

export default function ProductsPage() {
  const featured = PRODUCTS.find((p) => p.featured) ?? PRODUCTS[0];
  const remaining = PRODUCTS.filter((p) => p.slug !== featured.slug);

  return (
    <>
      <SEO
        title="SJI Products — Focused Web Applications & Utilities"
        description="Browse all SJI web products: AI knowledge-base chatbot builder, disposable temporary email, client-side image and PDF utilities, time tracking, URL shortening, calculators, and offline writing workspace."
        canonical="https://sji.one/products"
      />

      <div className="page-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb__link">SJI</Link>
            <span className="breadcrumb__sep" aria-hidden="true">/</span>
            <span className="breadcrumb__current">Products</span>
          </nav>
          <h1 className="page-hero__title">Products</h1>
          <p className="page-hero__sub">
            Seven focused web products, available directly in your browser.
          </p>
        </div>
      </div>

      <section className="section" aria-labelledby="products-catalog-heading">
        <div className="container">
          <h2 id="products-catalog-heading" className="visually-hidden">All SJI products</h2>

          {/* ── Featured Large Showcase ── */}
          {featured && (
            <div className="products-featured" style={{ marginBottom: 'var(--sp-8)' }}>
              <div className="pcard-spotlight">
                <div className="pcard-spotlight__copy">
                  <div className="pcard-spotlight__meta">
                    <div className="pcard__icon-wrap">
                      <ProductRealIcon product={featured} size={20} />
                    </div>
                    <span className="pcard-spotlight__badge">Featured Product</span>
                  </div>

                  <h3 className="pcard-spotlight__title">
                    <Link to={`/products/${featured.slug}`}>{featured.name}</Link>
                  </h3>
                  <p className="pcard-spotlight__tagline">{featured.tagline}</p>
                  <p className="pcard-spotlight__desc">{featured.description}</p>

                  <div className="product-card__cats" style={{ margin: 'var(--sp-4) 0' }}>
                    {featured.category.map((cat) => (
                      <span key={cat} className="product-card__cat">{cat}</span>
                    ))}
                  </div>

                  <div className="pcard-spotlight__actions">
                    <Link to={`/products/${featured.slug}`} className="btn btn--primary">
                      Learn more <ArrowRight size={14} />
                    </Link>
                    {featured.status === 'live' && (
                      <a
                        href={featured.appUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn--ghost"
                      >
                        Open {featured.name} <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="pcard-spotlight__visual">
                  <Link to={`/products/${featured.slug}`} tabIndex={-1} aria-hidden="true">
                    <div className="featured-product__browser">
                      <div className="featured-product__browser-bar">
                        <span className="featured-product__browser-dot" />
                        <span className="featured-product__browser-dot" />
                        <span className="featured-product__browser-dot" />
                      </div>
                      <ProductPreview
                        product={featured}
                        src={featured.previewImage}
                        alt={`${featured.name} preview`}
                        className="featured-product__browser-img"
                        loading="eager"
                        width={720}
                        height={400}
                      />
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ── Remaining Products Grid ── */}
          <div className="section-header--row" style={{ marginBottom: 'var(--sp-5)' }}>
            <div>
              <p className="eyebrow" style={{ marginBottom: 'var(--sp-1)' }}>Ecosystem</p>
              <h3 className="section-title" style={{ fontSize: '1.25rem' }}>
                All Web Products
              </h3>
            </div>
          </div>

          <div className="pcard-grid">
            {remaining.map((product, i) => (
              <ProductCard
                key={product.slug}
                product={product}
                variant="preview"
                animIndex={i + 1}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt section--border-top" aria-labelledby="products-about-heading">
        <div className="container">
          <div className="prose" style={{ maxWidth: '64ch' }}>
            <h2 id="products-about-heading" className="section-title" style={{ fontSize: '1.15rem' }}>
              About SJI products
            </h2>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-2)', lineHeight: 1.75, marginBottom: '1rem' }}>
              Every SJI product is an independent web application built around a single, focused
              purpose. Rather than building one large platform that tries to do everything, SJI
              takes the approach of building separate, lightweight web products that each solve a
              specific task with excellence.
            </p>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-2)', lineHeight: 1.75, marginBottom: '1rem' }}>
              Products like <Link to="/products/tempbox" style={{ color: 'var(--text)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>TempBox</Link> and{' '}
              <Link to="/products/tools" style={{ color: 'var(--text)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>Tools</Link> run
              entirely in your browser — your files and data stay on your device. Others, like{' '}
              <Link to="/products/prebase" style={{ color: 'var(--text)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>PreBase</Link>,
              are server-backed to enable more complex functionality such as conversational AI inference and
              persistent knowledge indexing.
            </p>
            <p style={{ fontSize: '0.9375rem', color: 'var(--text-2)', lineHeight: 1.75 }}>
              All SJI products are free to use. No mandatory accounts. No installation required.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
