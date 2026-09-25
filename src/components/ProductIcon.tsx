/**
 * ProductIcon — clean geometric SVG marks for each SJI product.
 * Monochrome, uses currentColor so they adapt to context.
 */

interface ProductIconProps {
  slug: string;
  size?: number;
}

export default function ProductIcon({ slug, size = 20 }: ProductIconProps) {
  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };

  switch (slug) {
    case 'prebase':
      // Stacked layers with a spark — knowledge base
      return (
        <svg {...props}>
          <ellipse cx="12" cy="5" rx="7" ry="2.5" />
          <path d="M5 5v5c0 1.38 3.13 2.5 7 2.5s7-1.12 7-2.5V5" />
          <path d="M5 10v5c0 1.38 3.13 2.5 7 2.5" />
          <path d="M16 17l2 2 4-4" strokeWidth={1.8} />
        </svg>
      );

    case 'tempbox':
      // Envelope with a clock — temporary inbox
      return (
        <svg {...props}>
          <rect x="2" y="6" width="20" height="14" rx="2" />
          <path d="M2 6l10 7 10-7" />
          <circle cx="17.5" cy="4.5" r="2.5" strokeWidth={1.4} />
          <path d="M17.5 3.5v1l.8.8" strokeWidth={1.3} />
        </svg>
      );

    case 'tools':
      // Sliders/controls — browser utilities
      return (
        <svg {...props}>
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
          <circle cx="8" cy="6" r="2" fill="currentColor" stroke="none" />
          <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" />
          <circle cx="10" cy="18" r="2" fill="currentColor" stroke="none" />
        </svg>
      );

    case 'time':
      // Clean clock face
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <polyline points="12 7 12 12 15.5 15.5" />
        </svg>
      );

    case 'shorty':
      // Chain link / URL arrow
      return (
        <svg {...props}>
          <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
        </svg>
      );

    case 'calc':
      // Calculator grid
      return (
        <svg {...props}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="3" y1="9" x2="21" y2="9" />
          <line x1="12" y1="9" x2="12" y2="21" />
          <line x1="7.5" y1="14" x2="7.5" y2="17" />
          <line x1="6" y1="15.5" x2="9" y2="15.5" />
          <rect x="14.5" y="14" width="3" height="1.2" rx="0.5" fill="currentColor" stroke="none" />
          <rect x="14.5" y="16.2" width="3" height="1.2" rx="0.5" fill="currentColor" stroke="none" />
        </svg>
      );

    case 'scratchpad':
      // Document with lines
      return (
        <svg {...props}>
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="8" y1="13" x2="16" y2="13" />
          <line x1="8" y1="17" x2="13" y2="17" />
        </svg>
      );

    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <line x1="12" y1="8" x2="12" y2="13" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      );
  }
}
