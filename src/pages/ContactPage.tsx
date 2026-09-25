import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const CONTACT_EMAIL = '';

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact — SJI"
        description="Get in touch with SJI. For general enquiries, product feedback, bug reports or other questions, contact us by email."
        canonical="https://sji.one/contact"
      />

      <div className="page-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb__link">SJI</Link>
            <span className="breadcrumb__sep" aria-hidden="true">/</span>
            <span className="breadcrumb__current">Contact</span>
          </nav>
          <h1 className="page-hero__title">Contact</h1>
          <p className="page-hero__sub">
            For general enquiries, product feedback or bug reports.
          </p>
        </div>
      </div>

      <section className="section" aria-labelledby="contact-heading">
        <div className="container">
          <div className="prose">
            <h2 id="contact-heading">Get in touch</h2>
            <p>
              For general enquiries, feedback about a specific product or to report a bug,
              reach us by email. We read every message.
            </p>

            {CONTACT_EMAIL ? (
              <div className="contact-placeholder">
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-3)', marginBottom: '0.5rem' }}>Email</p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="contact-email-link"
                  id="contact-email-link"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            ) : (
              <div className="contact-placeholder">
                <p style={{ fontSize: '0.875rem', color: 'var(--text-2)' }}>
                  Contact email coming soon. In the meantime, use the product links to open each
                  SJI application directly.
                </p>
              </div>
            )}

            <h2>Product-specific feedback</h2>
            <p>
              If you have feedback about a specific product, visit the product page for context
              before reaching out — it helps us understand your question faster.
            </p>
            <ul>
              {[
                ['PreBase', '/products/prebase'],
                ['TempBox', '/products/tempbox'],
                ['Tools', '/products/tools'],
                ['Time', '/products/time'],
                ['Shorty', '/products/shorty'],
                ['Calc', '/products/calc'],
                ['Scratchpad', '/products/scratchpad'],
              ].map(([name, to]) => (
                <li key={to}>
                  <Link to={to}>{name}</Link>
                </li>
              ))}
            </ul>

            <h2>Response times</h2>
            <p>
              We aim to respond to all enquiries within a few business days. High-priority issues
              such as service outages or security concerns are treated with greater urgency.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
