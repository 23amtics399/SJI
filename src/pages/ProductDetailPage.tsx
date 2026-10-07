import { useParams, Link, Navigate } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import JsonLd from '../components/JsonLd';
import ProductCard from '../components/ProductCard';
import ProductPreview from '../components/ProductPreview';
import { PRODUCTS, getProduct } from '../data/products';

/* -------------------------------------------------------
   Per-product capability card descriptions
   Three descriptions per product, matching features[0..2].
   ------------------------------------------------------- */
const CAPABILITY_DESCS: Record<string, [string, string, string]> = {
  prebase: [
    'PreBase ingests your PDFs, text files, and web pages to build a private, searchable knowledge index that powers accurate AI responses grounded in your content.',
    'Once your content is uploaded, PreBase automatically trains a conversational assistant that answers only from your material — no hallucinations from generic training data.',
    'Deploy your chatbot to any website by pasting a single embed snippet. Customise the appearance, conversational tone, and allowed topics to fit your product or brand.',
  ],
  tempbox: [
    'TempBox generates a working email address the moment you open it — no registration, no password, no personal information required. Copy and start using immediately.',
    'Emails sent to your TempBox address appear in real time directly in your browser session, including HTML content, attachments, and multi-part messages.',
    'Your temporary inbox and all received mail are automatically discarded when your session ends. No data is retained on TempBox servers after the session is over.',
  ],
  tools: [
    'Compress JPEG, PNG and WebP images with fine-grained quality control. Reduce file sizes dramatically while preserving visual fidelity — processing runs entirely in your browser.',
    'Resize images to exact pixel dimensions while preserving aspect ratio, or crop to a custom target region. Supports batch processing of multiple files in a single operation.',
    'Convert PDF pages to individual images, or combine multiple images into a single PDF document. Every operation is client-side — your files never leave your device.',
  ],
  time: [
    'Display the current time in digital or analog format. Add multiple time zones to the world clock panel to compare times across locations at a glance — useful for distributed teams.',
    'Track elapsed time with the stopwatch, including named lap splits. The countdown timer counts down from any custom duration with an alert when time expires.',
    'The Pomodoro timer implements the standard 25-minute focus / 5-minute break cycle. Set browser alarms that fire even when the tab is in the background via the Web Notifications API.',
  ],
  shorty: [
    'Paste any long URL and receive a short Shorty link within milliseconds. No account, no configuration, no dashboard — just paste and copy the result.',
    'Shorty links are clean, consistent and human-readable. They fit naturally in emails, social posts, documentation, and printed materials without the noise of tracking parameters.',
    'Copy your shortened link to the clipboard with a single click. Shorty maintains a session history so you can retrieve recently created links without re-shortening.',
  ],
  calc: [
    'Perform addition, subtraction, multiplication, division and percentage calculations instantly. Supports brackets for correct operator precedence and maintains a scrollable calculation history.',
    'Every operation is accessible from the keyboard. Number keys, operators, Enter to evaluate, Backspace to delete, Escape to clear — as fast as a physical calculator without leaving the browser.',
    'All calculation runs in the browser after the first load. SJI Calc continues working without an internet connection, making it reliable in environments with intermittent connectivity.',
  ],
  scratchpad: [
    'A minimal writing environment with no toolbars, no sidebars, no notifications competing for your attention. The interface disappears so you can focus entirely on the words.',
    'Content is saved to your browser\'s local storage as you type — no save button, no sync delay. When you reopen Scratchpad, your previous text is exactly where you left it.',
    'Scratchpad requires no account and no internet connection after the initial load. Export your content as plain text at any time when you need to move it elsewhere.',
  ],
};

/* -------------------------------------------------------
   Per-product unique editorial content
   ------------------------------------------------------- */
const PRODUCT_CONTENT: Record<string, {
  howItWorks: string;
  sections: { heading: string; body: string }[];
}> = {
  prebase: {
    howItWorks:
      'PreBase works by ingesting the content you provide — PDFs, text files, website pages — and building a searchable index from it. When a user asks a question, PreBase retrieves the most relevant pieces of your content and passes them to an AI language model to generate a grounded, accurate answer. The model only uses your content to answer, so responses stay on-topic.',
    sections: [
      {
        heading: 'What is PreBase?',
        body: 'PreBase is a platform for building AI-powered chatbots from your own knowledge. Instead of using a generic AI assistant that guesses at answers, PreBase lets you define exactly what content it draws from. You upload your documents, and PreBase creates a conversational interface on top of them.',
      },
      {
        heading: 'Key capabilities',
        body: 'Upload PDFs, plain text and web content as knowledge sources. Build a chat interface that responds only from your uploaded content. Embed the resulting chatbot widget on any website with a single line of code. Customise the appearance and conversational tone to match your product.',
      },
      {
        heading: 'Who uses PreBase?',
        body: 'Product teams who need support bots trained on their documentation. Internal teams who want a searchable assistant over company knowledge. Website owners who want to replace static FAQs with a conversational interface. Researchers managing large document collections.',
      },
      {
        heading: 'Getting started',
        body: 'Open PreBase, create a project, and upload your content. PreBase processes and indexes your files automatically. Once indexed, you can test the chat interface directly in the platform and adjust settings before embedding it on your site.',
      },
    ],
  },

  tempbox: {
    howItWorks:
      'TempBox generates a working email address on the spot — no registration needed. The inbox is immediately active and ready to receive messages. Emails arrive in real time. When you are done, simply close the tab. The inbox is automatically discarded. Nothing persists beyond your session unless you explicitly choose otherwise.',
    sections: [
      {
        heading: 'What is TempBox?',
        body: 'TempBox is a temporary email service. It gives you a real, working email address that you can use immediately — without creating an account or providing any personal information. The address is yours for as long as you need it, and disappears when you are done.',
      },
      {
        heading: 'How temporary email works',
        body: 'Each TempBox session creates a disposable inbox associated with a randomly generated email address. Any mail sent to that address appears in the inbox within seconds. There is no storage of your personal data, no connection to your real email account, and no record of the session after it ends.',
      },
      {
        heading: 'Common use cases',
        body: 'Signing up for a service without giving your real address. Receiving a one-time verification email without exposing your inbox. Testing email delivery during software development. Keeping your primary inbox free from newsletters and promotional mail.',
      },
      {
        heading: 'Privacy considerations',
        body: 'TempBox does not link disposable addresses to your identity. Emails received are held temporarily and are not retained after the session ends. TempBox is designed for one-time use — it is not a replacement for a permanent email account and should not be used for anything requiring long-term access.',
      },
    ],
  },

  tools: {
    howItWorks:
      'SJI Tools runs entirely in your browser using client-side JavaScript. When you upload a file, it never leaves your device — processing happens locally using browser APIs. This means your files are never sent to a server, and your data stays private by design.',
    sections: [
      {
        heading: 'What is SJI Tools?',
        body: 'SJI Tools is a collection of browser-based utilities for working with images and PDF files. Every operation runs locally in your browser — no uploads, no waiting for a server response, no account required.',
      },
      {
        heading: 'Image tools',
        body: 'Compress JPEG, PNG and WebP images with quality control. Resize images to specific dimensions while preserving aspect ratio. Crop images to a target area. Convert between common image formats. Batch-process multiple files at once.',
      },
      {
        heading: 'PDF tools',
        body: 'Convert PDF pages to images. Merge multiple images into a single PDF document. Rearrange, remove or extract pages from a PDF. All PDF operations use client-side libraries and do not require a server round-trip.',
      },
      {
        heading: 'Why browser-based?',
        body: 'Running tools in the browser means your files stay on your device. There is no risk of your files being retained on a third-party server, no upload size limits based on server constraints, and no latency from network round-trips. For most file operations, it is also faster than server-side processing.',
      },
    ],
  },

  time: {
    howItWorks:
      'SJI Time uses your browser\'s built-in timing APIs to track and display time with high accuracy. All calculations happen client-side. Alarms use the Web Notifications API to alert you even when the tab is in the background, as long as you have granted notification permission.',
    sections: [
      {
        heading: 'What is SJI Time?',
        body: 'SJI Time is a collection of browser-based time utilities in one clean interface. Digital clock, analog clock, world clock, stopwatch, countdown timer, Pomodoro timer and alarm — all available in a single tab without installation.',
      },
      {
        heading: 'Clocks',
        body: 'Display the current time in digital or analog format. The world clock lets you add multiple time zones and compare them at a glance — useful for coordinating across distributed teams or checking times before scheduling calls.',
      },
      {
        heading: 'Timers and stopwatch',
        body: 'The stopwatch tracks elapsed time with lap recording. The countdown timer counts down from any duration you set. The Pomodoro timer implements the standard 25-minute focus / 5-minute break cycle, with long break intervals after every four rounds.',
      },
      {
        heading: 'Alarm',
        body: 'Set a one-time or recurring alarm in your browser. SJI Time uses the Web Notifications API to alert you even when you have switched to another tab, provided you have granted notification permission. No app installation or system access is required.',
      },
    ],
  },

  shorty: {
    howItWorks:
      'Shorty receives a long URL, generates a short alias, and stores the mapping. When someone visits the short link, they are redirected to the original destination. The process is instant — paste, get a short link, copy and share.',
    sections: [
      {
        heading: 'What is Shorty?',
        body: 'Shorty is a URL shortener. It takes a long web address and produces a shorter, cleaner link that is easier to share, type and embed. No account is required for basic use.',
      },
      {
        heading: 'When to use a URL shortener',
        body: 'Long URLs become unwieldy in emails, social media posts, printed materials and presentations. A shortened link is easier to share verbally, fits naturally in text messages, and looks cleaner when embedded in documents or slides.',
      },
      {
        heading: 'How Shorty links work',
        body: 'Each short link created with Shorty maps to a specific destination URL. When someone clicks or enters a Shorty link, they are immediately redirected to the original address. The short link format is consistent and predictable.',
      },
      {
        heading: 'Appropriate use',
        body: 'Shorty is designed for sharing legitimate links. Do not use it to obscure the destination of malicious, deceptive or harmful content. Links found to violate acceptable use may be deactivated.',
      },
    ],
  },

  calc: {
    howItWorks:
      'SJI Calc evaluates arithmetic expressions in your browser using standard JavaScript math. All calculation happens client-side — no network requests are made. The interface supports both mouse and full keyboard input, making it as fast as a physical calculator.',
    sections: [
      {
        heading: 'What is SJI Calc?',
        body: 'SJI Calc is an online calculator for everyday arithmetic. Clean, fast and keyboard-friendly — it is designed to get out of the way and let you calculate. No ads, no unnecessary features, no sign-in.',
      },
      {
        heading: 'Supported operations',
        body: 'Addition, subtraction, multiplication and division. Percentage calculations. Brackets for order of operations. Calculation history so you can review previous results without re-entering them.',
      },
      {
        heading: 'Keyboard support',
        body: 'Every operation in SJI Calc is accessible from the keyboard. Number keys, operators, Enter to calculate, Backspace to delete, and Escape to clear. For users who prefer to stay on the keyboard, Calc is as fast as a physical calculator.',
      },
      {
        heading: 'Works offline',
        body: 'Because all calculation runs in the browser, SJI Calc continues to work without an internet connection once the page has loaded. It is suitable for use in environments with limited or intermittent connectivity.',
      },
    ],
  },

  scratchpad: {
    howItWorks:
      'SJI Scratchpad stores your text in your browser\'s local storage. Nothing is sent to a server. When you return to the page, your previous content is automatically restored from local storage. This means your notes persist between sessions on the same device and browser, without any account or synchronisation.',
    sections: [
      {
        heading: 'What is SJI Scratchpad?',
        body: 'SJI Scratchpad is a distraction-free writing workspace in your browser. Open it, write, close it — your content is saved automatically. No account, no syncing service, no settings to configure. Just a clean space to write.',
      },
      {
        heading: 'What Scratchpad is for',
        body: 'Quick notes during a call or meeting. Drafting a message or email before sending. Capturing ideas before they slip away. Temporary writing that you do not need to file or organise. Anything that would otherwise go into a sticky note.',
      },
      {
        heading: 'How your content is saved',
        body: 'Content is saved to your browser\'s local storage as you type — there is no save button. This means your notes persist as long as you use the same browser on the same device and do not clear browser data. Scratchpad is not a cloud sync service; content is not accessible from other devices.',
      },
      {
        heading: 'Limitations',
        body: 'Scratchpad is intentionally simple. It does not support rich text formatting, file attachments, folders, or multi-device sync. For longer-term or structured notes, a dedicated notes application is more appropriate. Scratchpad is for quick, temporary writing.',
      },
    ],
  },
};

/* -------------------------------------------------------
   Page component
   ------------------------------------------------------- */
export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProduct(slug ?? '');

  if (!product) return <Navigate to="/products" replace />;

  const related = PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.category.some((c) => product.category.includes(c))
  ).slice(0, 3);

  const relatedProducts =
    related.length >= 2
      ? related
      : PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3);

  const content = PRODUCT_CONTENT[product.slug];

  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    applicationCategory: 'WebApplication',
    description: product.description,
    url: product.appUrl,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    operatingSystem: 'Any',
    isPartOf: { '@type': 'WebSite', name: 'SJI', url: 'https://sji.one' },
  };

  return (
    <>
      <SEO
        title={product.seoTitle}
        description={product.seoDescription}
        canonical={`https://sji.one/products/${product.slug}`}
      />
      {product.status === 'live' && (
        <JsonLd data={softwareJsonLd} id={`jsonld-product-${product.slug}`} />
      )}

      {/* ── Hero ── */}
      <div className="product-detail-hero">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb__link">SJI</Link>
            <span className="breadcrumb__sep" aria-hidden="true">/</span>
            <Link to="/products" className="breadcrumb__link">Products</Link>
            <span className="breadcrumb__sep" aria-hidden="true">/</span>
            <span className="breadcrumb__current">{product.name}</span>
          </nav>

          <div className="product-detail-hero__inner">
            {/* Left: copy */}
            <div>
              <div className="product-detail-hero__cats">
                {product.category.map((cat) => (
                  <span key={cat} className="product-card__cat">{cat}</span>
                ))}
              </div>

              <h1 className="product-detail-hero__title">{product.name}</h1>
              <p className="product-detail-hero__tagline">{product.tagline}</p>
              <p className="product-detail-hero__desc">{product.description}</p>

              {product.status === 'live' ? (
                <a
                  href={product.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary btn--lg"
                  id={`open-${product.slug}`}
                >
                  Open {product.name}
                  <ExternalLink size={15} />
                </a>
              ) : (
                <span className="btn btn--ghost btn--lg btn--disabled">Coming soon</span>
              )}
            </div>

            {/* Right: browser mockup screenshot with ProductPreview */}
            <div className="product-detail-hero__screenshot" aria-hidden="true">
              <div className="product-detail-hero__browser">
                <div className="product-detail-hero__browser-bar">
                  <span className="product-detail-hero__browser-dot" />
                  <span className="product-detail-hero__browser-dot" />
                  <span className="product-detail-hero__browser-dot" />
                </div>
                <ProductPreview
                  product={product}
                  src={product.previewImage}
                  alt={`${product.name} application interface`}
                  className="product-detail-hero__preview-img"
                  loading="eager"
                  width={800}
                  height={460}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Feature highlights row ── */}
      <section className="section" style={{ padding: 'var(--sp-8) 0' }}>
        <div className="container">
          <p className="eyebrow" style={{ marginBottom: 'var(--sp-2)' }}>Capabilities</p>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 'var(--sp-4)' }}>
            Key Capabilities
          </h2>
          <div className="feature-cards-grid">
            {product.features.slice(0, 3).map((feat, idx) => (
              <div key={feat} className="feature-card">
                <p className="feature-card__num">0{idx + 1}</p>
                <p className="feature-card__title">{feat}</p>
                <p className="feature-card__desc">
                  {(CAPABILITY_DESCS[product.slug] ?? [])[idx] ??
                    `${feat} — a core part of what makes ${product.name} useful.`}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      {content && (
        <section className="section section--alt section--border-top" aria-labelledby={`how-${product.slug}`}>
          <div className="container">
            <div className="two-col">
              <div>
                <p className="eyebrow">Workflow</p>
                <h2 id={`how-${product.slug}`} style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '1rem' }}>
                  How it works
                </h2>
                <p style={{ fontSize: '0.9375rem', color: 'var(--text-2)', lineHeight: 1.75 }}>
                  {content.howItWorks}
                </p>
              </div>
              <div>
                <p className="eyebrow">Full Feature List</p>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '1rem' }}>
                  Features included
                </h2>
                <div className="feature-list">
                  {product.features.map((feat) => (
                    <p key={feat} className="feature-list__item">{feat}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Screenshot Gallery (Visual Proof) ── */}
      {product.screenshots && product.screenshots.length > 0 && (
        <section className="section section--border-top" aria-labelledby={`gallery-${product.slug}`}>
          <div className="container">
            <div className="section-header">
              <p className="eyebrow">Visual Interface</p>
              <h2 id={`gallery-${product.slug}`} className="section-title" style={{ fontSize: '1.25rem' }}>
                See {product.name} in action
              </h2>
              <p className="section-sub">
                A clean, distraction-free environment built for the task at hand.
              </p>
            </div>

            <div className="product-gallery">
              {product.screenshots.map((imgSrc, idx) => (
                <div key={imgSrc} className="product-gallery__item">
                  <div className="featured-product__browser-bar">
                    <span className="featured-product__browser-dot" />
                    <span className="featured-product__browser-dot" />
                    <span className="featured-product__browser-dot" />
                  </div>
                  <img
                    src={imgSrc}
                    alt={`${product.name} interface view ${idx + 1}`}
                    loading="lazy"
                  />
                  <div className="product-gallery__caption">
                    {idx === 0 ? `${product.name} Main View` : `${product.name} Interface & Controls`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Editorial sections ── */}
      {content && content.sections.length > 0 && (
        <section className="section section--alt section--border-top" aria-labelledby={`sections-${product.slug}`}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2.5rem 3.5rem' }}>
              {content.sections.map((sec) => (
                <div key={sec.heading}>
                  <h2
                    id={`${product.slug}-${sec.heading.toLowerCase().replace(/\s+/g, '-')}`}
                    style={{ fontSize: '0.9375rem', fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--text)', marginBottom: '0.65rem' }}
                  >
                    {sec.heading}
                  </h2>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-2)', lineHeight: 1.75 }}>
                    {sec.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Use cases & CTA ── */}
      <section className="section section--border-top" aria-labelledby={`uses-${product.slug}`}>
        <div className="container">
          <div className="two-col">
            <div>
              <p className="eyebrow">Audience</p>
              <h2 id={`uses-${product.slug}`} style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: '1rem' }}>
                Who it is for
              </h2>
              <div className="feature-list">
                {product.useCases.map((uc) => (
                  <p key={uc} className="feature-list__item">{uc}</p>
                ))}
              </div>
            </div>
            {product.status === 'live' && (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '2rem',
                  background: 'var(--bg-subtle)',
                  borderRadius: 'var(--r-xl)',
                  border: '1px solid var(--border)',
                }}
              >
                <p className="eyebrow" style={{ color: product.accentColor, marginBottom: '0.5rem' }}>
                  Web Product
                </p>
                <p style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--text)', marginBottom: '0.5rem' }}>
                  Ready to use {product.name}?
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-2)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                  Directly accessible in your browser. No registration or setup needed.
                </p>
                <div>
                  <a
                    href={product.appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--primary btn--lg"
                  >
                    Open {product.name}
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Related products ── */}
      <section className="section section--alt section--border-top" aria-labelledby={`related-${product.slug}`}>
        <div className="container">
          <div className="section-header--row">
            <div>
              <p className="eyebrow" style={{ marginBottom: 'var(--sp-1)' }}>Ecosystem</p>
              <h2 id={`related-${product.slug}`} className="section-title" style={{ fontSize: '1.25rem', marginBottom: 0 }}>
                Other SJI web products
              </h2>
            </div>
            <Link to="/products" className="btn btn--ghost btn--sm">
              All products <ArrowRight size={13} />
            </Link>
          </div>
          <div className="pcard-grid">
            {relatedProducts.map((p, i) => (
              <ProductCard key={p.slug} product={p} variant="preview" animIndex={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
