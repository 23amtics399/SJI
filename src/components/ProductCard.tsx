import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import ProductIcon from './ProductIcon';
import ProductPreview from './ProductPreview';
import type { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  /** 'grid' = tile in the homepage grid, 'preview' = card with screenshot */
  variant?: 'grid' | 'preview';
  /** Additional class names */
  className?: string;
  /** Stagger index for entrance animation */
  animIndex?: number;
}

export default function ProductCard({
  product,
  variant = 'preview',
  className = '',
  animIndex = 0,
}: ProductCardProps) {
  if (variant === 'grid') {
    return (
      <article className={`product-card ${className}`}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div className="product-card__icon-wrap">
            <ProductRealIcon product={product} size={18} />
          </div>
          {product.status === 'coming-soon' && (
            <span className="product-card__badge">Coming soon</span>
          )}
        </div>
        <div className="product-card__body">
          <p className="product-card__name">{product.name}</p>
          <p className="product-card__tagline">{product.tagline}</p>
          <div className="product-card__cats">
            {product.category.map((cat) => (
              <span key={cat} className="product-card__cat">{cat}</span>
            ))}
          </div>
        </div>
        <div className="product-card__footer">
          <Link to={`/products/${product.slug}`} className="product-card__link">
            View product →
          </Link>
          {product.status === 'live' && (
            <a
              href={product.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="product-card__ext"
              aria-label={`Open ${product.name}`}
            >
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </article>
    );
  }

  // ── 'preview' variant — card with screenshot ──
  return (
    <article
      className={`pcard ${className}`}
      style={{
        '--anim-delay': `${animIndex * 60}ms`,
        '--prod-accent': product.accentColor,
      } as React.CSSProperties}
    >
      {/* Screenshot area */}
      <Link
        to={`/products/${product.slug}`}
        className="pcard__preview-link"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="pcard__preview">
          <ProductPreview
            product={product}
            src={product.previewImage}
            alt={`${product.name} web application interface`}
            className="pcard__img"
            loading="lazy"
            width={640}
            height={360}
          />
        </div>
      </Link>

      {/* Card body */}
      <div className="pcard__body">
        <div className="pcard__body-top">
          <div className="pcard__icon-wrap">
            <ProductRealIcon product={product} size={16} />
          </div>
          {product.status === 'coming-soon' ? (
            <span className="product-card__badge">Coming soon</span>
          ) : (
            <span
              className="pcard__status-dot"
              style={{ backgroundColor: product.accentColor }}
              title="Live product"
            />
          )}
        </div>

        <Link to={`/products/${product.slug}`} className="pcard__name-link">
          <p className="pcard__name">{product.name}</p>
        </Link>
        <p className="pcard__tagline">{product.tagline}</p>

        <div className="pcard__footer">
          <div className="product-card__cats">
            {product.category.slice(0, 2).map((cat) => (
              <span key={cat} className="product-card__cat">{cat}</span>
            ))}
          </div>
          {product.status === 'live' && (
            <a
              href={product.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="pcard__open-btn"
              aria-label={`Open ${product.name}`}
            >
              <span>Open</span>
              <ArrowRight size={13} className="pcard__open-arrow" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/** Renders real product icon SVG if available, falls back to geometric ProductIcon */
export function ProductRealIcon({ product, size }: { product: Product; size: number }) {
  const [hasError, setHasError] = useState(false);

  if (product.icon && !hasError) {
    return (
      <img
        src={product.icon}
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        style={{ width: size, height: size, objectFit: 'contain', display: 'block' }}
        onError={() => setHasError(true)}
      />
    );
  }
  return <ProductIcon slug={product.slug} size={size} />;
}
