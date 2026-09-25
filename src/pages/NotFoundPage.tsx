import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="Page Not Found — SJI"
        description="This page does not exist. Find what you are looking for on the SJI products page."
        canonical="https://sji.one/404"
      />

      <div className="not-found">
        <div className="container not-found__inner">
          <span className="not-found__code">404</span>
          <h1 className="not-found__title">Page not found.</h1>
          <p className="not-found__sub">
            This page does not exist or has been moved. Try finding what you need
            from the homepage or the products directory.
          </p>
          <div className="not-found__actions">
            <Link to="/" className="btn btn--primary">
              Back to home
            </Link>
            <Link to="/products" className="btn btn--ghost">
              View products
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
