import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  const productLinks = [
    { to: '/products/prebase', label: 'PreBase' },
    { to: '/products/tempbox', label: 'TempBox' },
    { to: '/products/tools', label: 'Tools' },
    { to: '/products/time', label: 'Time' },
    { to: '/products/shorty', label: 'Shorty' },
    { to: '/products/calc', label: 'Calc' },
    { to: '/products/scratchpad', label: 'Scratchpad' },
  ];

  const networkLinks = [
    { href: 'https://prebase.sji.one', label: 'prebase.sji.one' },
    { href: 'https://tempbox.sji.one', label: 'tempbox.sji.one' },
    { href: 'https://tools.sji.one', label: 'tools.sji.one' },
    { href: 'https://time.sji.one', label: 'time.sji.one' },
    { href: 'https://shorty.sji.one', label: 'shorty.sji.one' },
    { href: 'https://calc.sji.one', label: 'calc.sji.one' },
    { href: 'https://scratchpad.sji.one', label: 'scratchpad.sji.one' },
  ];

  const sjiLinks = [
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/privacy', label: 'Privacy' },
    { to: '/terms', label: 'Terms' },
  ];

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">SJI.</Link>
          <p className="footer__tagline">Useful software for the web.</p>
        </div>

        <div className="footer__cols-wrap">
          <div className="footer__col">
            <p className="footer__col-title">Products</p>
            <ul className="footer__links">
              {productLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="footer__link">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <p className="footer__col-title">Network</p>
            <ul className="footer__links">
              {networkLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="footer__link" target="_blank" rel="noopener noreferrer">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <p className="footer__col-title">SJI</p>
            <ul className="footer__links">
              {sjiLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="footer__link">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copy">© {year} SJI</p>
      </div>
    </footer>
  );
}
