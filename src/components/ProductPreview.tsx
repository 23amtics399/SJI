import { useState } from 'react';
import type { Product } from '../data/products';
import ProductIcon from './ProductIcon';

interface ProductPreviewProps {
  product: Product;
  src?: string | null;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
}

export default function ProductPreview({
  product,
  src,
  alt,
  className = '',
  loading = 'lazy',
  width = 640,
  height = 400,
}: ProductPreviewProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const showFallback = !src || hasError;

  if (showFallback) {
    return (
      <div
        className={`product-preview-fallback ${className}`}
        style={{
          '--prod-accent': product.accentColor || 'var(--text-3)',
        } as React.CSSProperties}
        role="img"
        aria-label={`${product.name} preview`}
      >
        <div className="product-preview-fallback__inner">
          <div className="product-preview-fallback__icon">
            {product.icon ? (
              <img
                src={product.icon}
                alt=""
                aria-hidden="true"
                width={36}
                height={36}
                style={{ width: 36, height: 36, objectFit: 'contain' }}
                onError={(e) => {
                  // If SVG also fails, hide it and let container show initials
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            ) : (
              <ProductIcon slug={product.slug} size={32} />
            )}
          </div>
          <span className="product-preview-fallback__name">{product.name}</span>
          <span className="product-preview-fallback__tag">{product.category[0]}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`product-preview-wrap ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`product-preview-img ${isLoaded ? 'product-preview-img--loaded' : ''}`}
        loading={loading}
        width={width}
        height={height}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
