export type ProductStatus = 'live' | 'coming-soon';

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: string[];
  appUrl: string;
  status: ProductStatus;
  features: string[];
  useCases: string[];
  seoTitle: string;
  seoDescription: string;
  /** Whether product is showcased as featured on homepage/products page */
  featured?: boolean;
  /** Product accent color — used ONLY for product-specific accents, never as SJI chrome */
  accentColor: string;
  /** Path to the real product icon SVG (relative to /public) */
  icon: string;
  /** Path to the main product UI screenshot (relative to /public) */
  previewImage: string | null;
  /** Additional screenshots for the product detail page gallery */
  screenshots: string[];
}

export const PRODUCTS: Product[] = [
  {
    slug: 'prebase',
    name: 'PreBase',
    tagline: 'AI knowledge-base chatbot builder.',
    description:
      'Build AI-powered chatbots from your own documents and knowledge. Add your content, train your assistant, and embed it on any website.',
    longDescription:
      'PreBase lets you turn your existing documents, PDFs, and knowledge into a conversational AI assistant. Whether you need a support bot, an internal knowledge assistant, or an embedded FAQ widget, PreBase handles the hard work — ingesting your content, indexing it, and powering natural language conversations on top of it.',
    category: ['AI', 'Productivity'],
    appUrl: 'https://prebase.sji.one',
    status: 'live',
    featured: true,
    features: [
      'Upload PDFs, text files, and web content as knowledge sources',
      'Automatically trained conversational AI assistant',
      'Embeddable chat widget for any website',
      'Customisable appearance and personality',
      'Supports multiple knowledge bases per project',
      'Conversation history and analytics',
    ],
    useCases: [
      'Customer support chatbots trained on your product documentation',
      'Internal team knowledge assistants',
      'FAQ automation for websites and landing pages',
      'Research assistants for large document collections',
    ],
    seoTitle: 'PreBase — AI Knowledge Base Chatbot | SJI',
    seoDescription:
      'Build an AI chatbot from your own documents and knowledge with PreBase. Upload content, train your assistant and embed it on any website. A product by SJI.',
    accentColor: '#2563eb',
    icon: '/products/prebase/icon.svg',
    previewImage: '/products/prebase/preview.png',
    screenshots: [
      '/products/prebase/preview.png',
      '/products/prebase/dashboard.png',
    ],
  },
  {
    slug: 'tempbox',
    name: 'TempBox',
    tagline: 'Temporary email, no account needed.',
    description:
      'Receive emails using a disposable temporary address. Protect your primary inbox from spam, sign-up flows, and one-time verifications.',
    longDescription:
      'TempBox gives you a working temporary email address instantly — no registration, no password, no commitment. Use it to sign up for services, receive verification emails, or test email delivery, then discard it. Your primary inbox stays clean.',
    category: ['Privacy', 'Utility'],
    appUrl: 'https://tempbox.sji.one',
    status: 'live',
    features: [
      'Instant disposable email address — no sign-up required',
      'Receive emails and attachments in real time',
      'Multiple inbox sessions',
      'Automatically expires after use',
      'No personal data stored',
      'Works with any service requiring email verification',
    ],
    useCases: [
      'Signing up for a service without using your real email',
      'Receiving one-time verification codes',
      'Testing email delivery during development',
      'Keeping your primary inbox free from promotional email',
    ],
    seoTitle: 'TempBox — Temporary Email | SJI',
    seoDescription:
      'Get a free disposable temporary email address instantly with TempBox. No sign-up required. Protect your inbox from spam and unwanted emails. A product by SJI.',
    accentColor: '#10b981',
    icon: '/products/tempbox/icon.svg',
    previewImage: '/products/tempbox/preview.png',
    screenshots: ['/products/tempbox/preview.png'],
  },
  {
    slug: 'tools',
    name: 'Tools',
    tagline: 'Image and PDF utilities in your browser.',
    description:
      'A collection of browser-based image and PDF tools. Compress, resize, crop, convert and manipulate files without uploading them to a server.',
    longDescription:
      'SJI Tools is a browser-based utility suite for common image and PDF tasks. Everything runs client-side in your browser — your files never leave your device. Compress images before uploading them, resize photos for social media, convert PDFs to images, or merge images into a single PDF, all without installing software.',
    category: ['Utilities', 'Productivity'],
    appUrl: 'https://tools.sji.one',
    status: 'live',
    features: [
      'Image compression with quality control',
      'Image resizing and cropping',
      'PDF to image conversion',
      'Image to PDF conversion',
      'Batch processing support',
      'All processing happens in your browser — no server uploads',
    ],
    useCases: [
      'Reducing image file sizes before uploading to a website',
      'Extracting pages from a PDF as images',
      'Preparing images for social media and email',
      'Converting scanned images into a PDF document',
    ],
    seoTitle: 'Tools — Online Image & PDF Utilities | SJI',
    seoDescription:
      'Free browser-based image and PDF tools by SJI. Compress, resize, crop images and convert PDFs online — all client-side, no uploads required.',
    accentColor: '#0ea5e9',
    icon: '/products/tools/icon.svg',
    previewImage: '/products/tools/preview.png',
    screenshots: ['/products/tools/preview.png'],
  },
  {
    slug: 'time',
    name: 'Time',
    tagline: 'Clocks, timers, stopwatch and alarms.',
    description:
      'A complete set of time utilities in one place. Digital and analog clocks, world clock, stopwatch, countdown timer, Pomodoro timer and alarm.',
    longDescription:
      'SJI Time brings together every time-related tool you might need in a clean, focused interface. Track elapsed time with the stopwatch, set a countdown for deadlines, use the Pomodoro timer for focused work sessions, set an alarm, or keep an eye on multiple time zones with the world clock.',
    category: ['Utilities'],
    appUrl: 'https://time.sji.one',
    status: 'live',
    features: [
      'Digital and analog clock display',
      'World clock with multiple time zones',
      'Stopwatch with lap recording',
      'Countdown timer with custom duration',
      'Pomodoro timer for focused work sessions',
      'Browser-based alarm with notification support',
    ],
    useCases: [
      'Tracking time during focused work or study sessions',
      'Coordinating across time zones with distributed teams',
      'Setting countdown timers for presentations or events',
      'Using Pomodoro technique for productivity',
    ],
    seoTitle: 'Time — Online Clocks, Timers & Stopwatch | SJI',
    seoDescription:
      'Free online time tools by SJI. Digital clock, world clock, stopwatch, countdown timer, Pomodoro timer and alarm — all in one place.',
    accentColor: '#8b5cf6',
    icon: '/products/time/icon.svg',
    previewImage: '/products/time/preview.png',
    screenshots: ['/products/time/preview.png'],
  },
  {
    slug: 'shorty',
    name: 'Shorty',
    tagline: 'Simple URL shortening.',
    description:
      'Shorten long URLs into clean, shareable links. Fast, simple and developer-friendly.',
    longDescription:
      'Shorty is a no-frills URL shortener focused on simplicity. Paste a long URL, get a short one. No account, no dashboard complexity — just fast, clean link shortening for sharing links in emails, social media, and documentation.',
    category: ['Utility', 'Developer'],
    appUrl: 'https://shorty.sji.one',
    status: 'live',
    features: [
      'Instant URL shortening',
      'Clean, memorable short links',
      'Copy to clipboard with one click',
      'No account required for basic use',
      'Developer-friendly API access',
      'Link history in browser session',
    ],
    useCases: [
      'Sharing long URLs on social media or in messages',
      'Cleaning up affiliate or tracking links',
      'Shortening documentation and reference links',
      'Creating compact links for print or presentations',
    ],
    seoTitle: 'Shorty — URL Shortener | SJI',
    seoDescription:
      'Free URL shortener by SJI. Paste a long URL and get a short, clean link instantly. Simple, fast and developer-friendly.',
    accentColor: '#8b5cf6',
    icon: '/products/shorty/icon.svg',
    previewImage: '/products/shorty/preview.png',
    screenshots: ['/products/shorty/preview.png'],
  },
  {
    slug: 'calc',
    name: 'Calc',
    tagline: 'Fast everyday calculations.',
    description:
      'A clean, fast online calculator for everyday arithmetic. Simple to use, keyboard-friendly, always available in your browser.',
    longDescription:
      'SJI Calc is a straightforward online calculator designed to be fast, accurate and easy to use. It supports basic arithmetic, percentage calculations and keyboard input, making it the fastest way to do a quick calculation without leaving your browser.',
    category: ['Utility'],
    appUrl: 'https://calc.sji.one',
    status: 'live',
    features: [
      'Basic arithmetic operations',
      'Percentage calculations',
      'Full keyboard support',
      'Calculation history',
      'Clean, readable display',
      'Works offline',
    ],
    useCases: [
      'Quick arithmetic without leaving the browser',
      'Calculating percentages for discounts and tips',
      'Basic financial calculations',
      'Checking sums during data entry',
    ],
    seoTitle: 'Calc — Online Calculator | SJI',
    seoDescription:
      'Free online calculator by SJI. Fast, clean and keyboard-friendly. Perfect for everyday arithmetic and percentage calculations.',
    accentColor: '#f59e0b',
    icon: '/products/calc/icon.svg',
    previewImage: '/products/calc/preview.png',
    screenshots: ['/products/calc/preview.png'],
  },
  {
    slug: 'scratchpad',
    name: 'Scratchpad',
    tagline: 'A browser-based writing workspace.',
    description:
      'A distraction-free writing and note-taking space in your browser. No account, no syncing — just write.',
    longDescription:
      'SJI Scratchpad gives you a clean, persistent writing space that lives in your browser. It saves your content automatically to local storage, so your notes are there when you come back. No sign-in, no server, no clutter — just a quiet place to write, think, and draft.',
    category: ['Productivity'],
    appUrl: 'https://scratchpad.sji.one',
    status: 'live',
    features: [
      'Distraction-free writing environment',
      'Auto-saves to browser local storage',
      'No account or sign-in required',
      'Works offline',
      'Clean, minimal typography',
      'Export as plain text',
    ],
    useCases: [
      'Quickly capturing thoughts and ideas',
      'Drafting emails or messages before sending',
      'Temporary note-taking during research',
      'Writing outlines and short-form content',
    ],
    seoTitle: 'Scratchpad — Online Writing Workspace | SJI',
    seoDescription:
      'Free browser-based scratchpad by SJI. A distraction-free writing workspace that auto-saves to your browser. No account required.',
    accentColor: '#14b8a6',
    icon: '/products/scratchpad/icon.svg',
    previewImage: '/products/scratchpad/preview.png',
    screenshots: ['/products/scratchpad/preview.png'],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
