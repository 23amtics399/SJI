import { useEffect } from 'react';

interface JsonLdProps {
  data: Record<string, unknown>;
  id: string;
}

export default function JsonLd({ data, id }: JsonLdProps) {
  useEffect(() => {
    const existing = document.getElementById(id);
    if (existing) existing.remove();

    const script = document.createElement('script');
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
