import { useEffect } from 'react';

export interface MetaTag {
  readonly name?: string;
  readonly property?: string;
  readonly content: string;
}

/** Upserts meta tags while mounted, restores previous values on unmount. */
export function useDocumentMeta(tags: readonly MetaTag[]): void {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const created: HTMLMetaElement[] = [];

    for (const tag of tags) {
      const selector = tag.name
        ? `meta[name="${tag.name}"]`
        : `meta[property="${tag.property ?? ''}"]`;
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement('meta');
        if (tag.name) el.setAttribute('name', tag.name);
        if (tag.property) el.setAttribute('property', tag.property);
        document.head.appendChild(el);
        created.push(el);
      }
      el.setAttribute('content', tag.content);
    }

    return () => {
      for (const el of created) el.remove();
    };
  }, [tags]);
}
