import { useEffect } from 'react';

interface JsonLdProps {
  data: Record<string, unknown>;
  id: string;
}

export default function JsonLd({ data, id }: JsonLdProps) {
  useEffect(() => {
    // 1. If script with this ID already exists, update textContent
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (script) {
      script.textContent = JSON.stringify(data);
      return;
    }

    // 2. If a prerendered script of the same @type exists, adopt it to avoid duplicate
    const existing = document.querySelectorAll('script[type="application/ld+json"]');
    for (const el of existing) {
      try {
        const parsed = JSON.parse(el.textContent || '{}');
        if (parsed['@type'] === data['@type']) {
          el.id = id;
          el.textContent = JSON.stringify(data);
          return () => {
            document.getElementById(id)?.remove();
          };
        }
      } catch {
        // ignore
      }
    }

    // 3. Otherwise create and append a new script
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      document.getElementById(id)?.remove();
    };
  }, [data, id]);

  return null;
}
