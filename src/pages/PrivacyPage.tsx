import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import JsonLd from '../components/JsonLd';

export default function PrivacyPage() {
  const privacyJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy — SJI',
    description: 'Privacy policy for SJI and all SJI products including PreBase, TempBox, Tools, Time, Shorty, Calc and Scratchpad.',
    url: 'https://sji.one/privacy',
    isPartOf: {
      '@type': 'WebSite',
      name: 'SJI',
      url: 'https://sji.one',
    },
  };

  return (
    <>
      <SEO
        title="Privacy Policy — SJI"
        description="Privacy policy for SJI and all SJI products including PreBase, TempBox, Tools, Time, Shorty, Calc and Scratchpad."
        canonical="https://sji.one/privacy"
      />
      <JsonLd data={privacyJsonLd} id="jsonld-privacy" />

      <div className="page-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb__link">SJI</Link>
            <span className="breadcrumb__sep" aria-hidden="true">/</span>
            <span className="breadcrumb__current">Privacy</span>
          </nav>
          <h1 className="page-hero__title">Privacy Policy</h1>
          <p className="page-hero__sub">Last updated: 2025.</p>
        </div>
      </div>

      <section className="section" aria-labelledby="privacy-heading">
        <div className="container">
          <div className="prose">
            <h2 id="privacy-heading">Overview</h2>
            <p>
              SJI is a collection of web products operated under the domain <strong>sji.one</strong>.
              This policy describes how SJI handles data across its products. We are committed to
              collecting only what is necessary and retaining nothing beyond operational requirements.
            </p>

            <h2>Client-side products</h2>
            <p>
              Several SJI products run entirely in your browser. These include{' '}
              <Link to="/products/tools">Tools</Link>,{' '}
              <Link to="/products/calc">Calc</Link>,{' '}
              <Link to="/products/time">Time</Link> and{' '}
              <Link to="/products/scratchpad">Scratchpad</Link>.
            </p>
            <p>
              For these products, your files, inputs and data never leave your device.
              No data is transmitted to SJI servers during normal use of these products.
              Scratchpad saves content to your browser's local storage, which stays on your device
              and is not accessible to SJI.
            </p>

            <h2>Server-side products</h2>
            <p>
              Products that require server infrastructure — such as{' '}
              <Link to="/products/tempbox">TempBox</Link> and{' '}
              <Link to="/products/prebase">PreBase</Link> — process data on SJI servers
              to deliver their functionality.
            </p>
            <ul>
              <li>
                <strong>TempBox</strong>: Emails received by your temporary inbox pass through
                our servers to deliver them to your session. Emails and inbox sessions are
                automatically discarded when the session ends. We do not store email content
                beyond the active session.
              </li>
              <li>
                <strong>PreBase</strong>: Documents you upload are stored and indexed to power
                your chatbot. This content is retained until you delete your project. Conversation
                logs may be retained for analytics and model improvement purposes.
              </li>
            </ul>

            <h2>Analytics and logging</h2>
            <p>
              SJI may collect aggregate, anonymised usage data — such as page views and feature
              usage counts — to understand how products are being used and where to focus
              improvement efforts. This data is not linked to individual users.
            </p>
            <p>
              Standard web server logs (IP addresses, request timestamps, URLs accessed) may be
              retained for security and diagnostic purposes for a limited period.
            </p>

            <h2>Cookies</h2>
            <p>
              SJI uses minimal cookies. The theme preference (light/dark mode) is stored in your
              browser's local storage, not as a cookie. No tracking cookies or third-party
              advertising cookies are used on SJI properties.
            </p>

            <h2>Third-party services</h2>
            <p>
              Some SJI products integrate with third-party AI services (for example, PreBase uses
              language model APIs to generate chatbot responses). Data processed through these
              integrations is subject to the third party's own privacy policies.
            </p>

            <h2>Your rights</h2>
            <p>
              For data processed by SJI in server-side products, you may request deletion of your
              data by contacting us at the address on the <Link to="/contact">Contact</Link> page.
            </p>

            <h2>Changes to this policy</h2>
            <p>
              We may update this policy to reflect changes in our products or applicable law.
              Material changes will be noted with an updated date at the top of this page.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
