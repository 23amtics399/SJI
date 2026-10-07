import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import JsonLd from '../components/JsonLd';
import ProductPreview from '../components/ProductPreview';
import { PRODUCTS } from '../data/products';

export default function AboutPage() {
  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About SJI',
    description: 'SJI is a collection of focused web products built around practical everyday needs. Each product solves a single task simply and quickly.',
    url: 'https://sji.one/about',
    isPartOf: {
      '@type': 'WebSite',
      name: 'SJI',
      url: 'https://sji.one',
    },
  };

  return (
    <>
      <SEO
        title="About SJI — Software Designed to Stay Out of Your Way"
        description="SJI is a collection of focused web products built around practical everyday needs. Each product solves a single task simply and quickly."
        canonical="https://sji.one/about"
      />
      <JsonLd data={aboutJsonLd} id="jsonld-about" />

      <div className="page-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb__link">SJI</Link>
            <span className="breadcrumb__sep" aria-hidden="true">/</span>
            <span className="breadcrumb__current">About</span>
          </nav>
          <h1 className="page-hero__title">Software designed to stay out of your way.</h1>
          <p className="page-hero__sub">
            SJI is a public collection of focused web products built around practical everyday needs.
          </p>
        </div>
      </div>

      <section className="section" aria-labelledby="about-what-heading">
        <div className="container">
          <div className="two-col">
            <div className="prose">
              <h2 id="about-what-heading">What is SJI?</h2>
              <p>
                SJI is a platform of independent web products. Each product is a focused web
                application that does one thing and does it well. The products span practical
                everyday needs — temporary email, image and PDF tools, time tracking, URL shortening,
                calculation, writing space — and more complex products like AI-powered
                knowledge base tooling.
              </p>
              <p>
                Every SJI product shares a common design principle: the product should get out of
                your way and let you do the thing you came to do. No feature bloat, no
                unnecessary sign-up flows, no dark patterns.
              </p>

              <h2>What SJI is not</h2>
              <p>
                SJI is not a platform trying to become the next all-in-one productivity suite.
                It is not a venture-backed startup looking to monetise engagement. It is a
                deliberately focused collection of web products that solve specific
                problems without overcomplicating them.
              </p>
              <p>
                Products on SJI are not prototypes or experiments — they are functional,
                maintained web applications intended to be genuinely useful.
              </p>

              <h2>How SJI products work</h2>
              <p>
                Where possible, SJI products run entirely in your browser. This means your
                files, your data and your input stay on your device and are never transmitted
                to a server. Products like{' '}
                <Link to="/products/tools">Tools</Link>,{' '}
                <Link to="/products/calc">Calc</Link>,{' '}
                <Link to="/products/time">Time</Link> and{' '}
                <Link to="/products/scratchpad">Scratchpad</Link> fall into this category.
              </p>
              <p>
                Some products require server-side infrastructure to function — for example,{' '}
                <Link to="/products/tempbox">TempBox</Link> needs to receive and relay email,
                and <Link to="/products/prebase">PreBase</Link> requires AI inference
                and persistent storage. For these products, only the minimum necessary data
                is processed, and nothing is retained beyond operational necessity.
              </p>
            </div>

            <div>
              <div className="about-ecosystem-card">
                <div>
                  <span className="section-tag">Public Product Ecosystem</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '0.5rem', color: 'var(--text)' }}>
                    7 Live Web Products
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--text-3)', marginTop: '0.25rem', lineHeight: 1.5 }}>
                    Real, maintained web applications built for immediate daily use.
                  </p>
                </div>

                {/* Visual collage of actual product previews */}
                <div className="about-preview-collage">
                  {PRODUCTS.find((p) => p.slug === 'prebase') && (
                    <div className="about-preview-collage__main">
                      <ProductPreview
                        product={PRODUCTS.find((p) => p.slug === 'prebase')!}
                        src="/products/prebase/preview.png"
                        alt="PreBase AI knowledge base chatbot"
                      />
                    </div>
                  )}
                  <div className="about-preview-collage__sub">
                    {PRODUCTS.find((p) => p.slug === 'tempbox') && (
                      <ProductPreview
                        product={PRODUCTS.find((p) => p.slug === 'tempbox')!}
                        src="/products/tempbox/preview.png"
                        alt="TempBox temporary email"
                      />
                    )}
                    {PRODUCTS.find((p) => p.slug === 'tools') && (
                      <ProductPreview
                        product={PRODUCTS.find((p) => p.slug === 'tools')!}
                        src="/products/tools/preview.png"
                        alt="SJI Tools image and PDF tools"
                      />
                    )}
                  </div>
                </div>

                {/* Clean product list with actual icons */}
                <div className="about-product-list">
                  {PRODUCTS.map((product) => (
                    <Link
                      key={product.slug}
                      to={`/products/${product.slug}`}
                      className="about-product-item"
                    >
                      <div className="about-product-item__icon-wrap">
                        <img src={product.icon} alt="" width="18" height="18" />
                      </div>
                      <div className="about-product-item__info">
                        <div className="about-product-item__top">
                          <span className="about-product-item__name">{product.name}</span>
                          <span className="about-product-item__cat">{product.category[0]}</span>
                        </div>
                        <span className="about-product-item__tagline">{product.tagline}</span>
                      </div>
                      <svg className="about-product-item__arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 3.5L10.5 8L6 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--alt section--border-top" aria-labelledby="about-principle-heading">
        <div className="container">
          <h2 id="about-principle-heading" className="section-title" style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
            The core design principle
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-2)', lineHeight: 1.75, maxWidth: '64ch', marginBottom: '1.5rem' }}>
            The consistent thread across all SJI products is restraint. Adding features is easy.
            Deciding what not to include — what to deliberately leave out — is harder and more valuable.
          </p>
          <p style={{ fontSize: '0.9375rem', color: 'var(--text-2)', lineHeight: 1.75, maxWidth: '64ch' }}>
            A calculator should calculate. A scratchpad should let you write. A temporary email
            inbox should give you an inbox. The user should never need to navigate away from the
            core task to find or configure something.
          </p>
        </div>
      </section>
    </>
  );
}
