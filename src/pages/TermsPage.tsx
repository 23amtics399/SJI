import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import JsonLd from '../components/JsonLd';

export default function TermsPage() {
  const termsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Use — SJI',
    description: 'Terms of use for SJI and all SJI products. Read the rules that govern your use of SJI web products.',
    url: 'https://sji.one/terms',
    isPartOf: {
      '@type': 'WebSite',
      name: 'SJI',
      url: 'https://sji.one',
    },
  };

  return (
    <>
      <SEO
        title="Terms of Use — SJI"
        description="Terms of use for SJI and all SJI products. Read the rules that govern your use of SJI web products."
        canonical="https://sji.one/terms"
      />
      <JsonLd data={termsJsonLd} id="jsonld-terms" />

      <div className="page-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb__link">SJI</Link>
            <span className="breadcrumb__sep" aria-hidden="true">/</span>
            <span className="breadcrumb__current">Terms</span>
          </nav>
          <h1 className="page-hero__title">Terms of Use</h1>
          <p className="page-hero__sub">Last updated: 2025.</p>
        </div>
      </div>

      <section className="section" aria-labelledby="terms-heading">
        <div className="container">
          <div className="prose">
            <h2 id="terms-heading">Acceptance</h2>
            <p>
              By using any SJI product or visiting sji.one, you agree to these terms. If you do
              not agree, do not use SJI products.
            </p>

            <h2>Use of SJI products</h2>
            <p>
              SJI products are provided for lawful personal and professional use. You may use
              SJI products to perform the tasks they are designed for. You may not:
            </p>
            <ul>
              <li>Use SJI products to facilitate illegal activity.</li>
              <li>Attempt to reverse-engineer, scrape or abuse SJI infrastructure.</li>
              <li>Use automated means to access products at a rate that impairs availability for others.</li>
              <li>Use <Link to="/products/shorty">Shorty</Link> to shorten links to malicious, deceptive or harmful content.</li>
              <li>Use <Link to="/products/tempbox">TempBox</Link> to circumvent identity verification for illegal purposes.</li>
            </ul>

            <h2>Free use</h2>
            <p>
              SJI products are currently offered free of charge. SJI reserves the right to
              introduce pricing, rate limits or account requirements for any product at any time,
              with reasonable notice where possible.
            </p>

            <h2>No warranty</h2>
            <p>
              SJI products are provided "as is" without warranty of any kind. We do not guarantee
              continuous availability, accuracy of results, or fitness for any particular purpose.
              Use SJI products at your own discretion.
            </p>

            <h2>Limitation of liability</h2>
            <p>
              To the extent permitted by law, SJI is not liable for any direct, indirect,
              incidental or consequential damages arising from your use of — or inability to use
              — any SJI product.
            </p>

            <h2>Intellectual property</h2>
            <p>
              Content, code and design elements of SJI products and sji.one are owned by SJI.
              Content you upload to SJI products (for example, documents uploaded to PreBase)
              remains your property.
            </p>

            <h2>Changes</h2>
            <p>
              These terms may be updated from time to time. Continued use of SJI products after
              changes are posted constitutes acceptance of the revised terms.
            </p>

            <h2>Contact</h2>
            <p>
              For questions about these terms, visit the <Link to="/contact">Contact</Link> page.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
