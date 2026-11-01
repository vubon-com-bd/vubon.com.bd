import { useEffect } from 'react';

/** Sets favicon while mounted, restores previous on unmount. */
export function useFavicon(href: string): void {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    const prev = link?.getAttribute('href') ?? null;

    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = href;

    return () => {
      if (!link) return;
      if (prev === null) link.remove();
      else link.href = prev;
    };
  }, [href]);
}
