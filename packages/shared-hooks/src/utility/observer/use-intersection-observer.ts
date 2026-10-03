import { useEffect, useState, type RefObject } from 'react';

export interface IntersectionResult {
  readonly isIntersecting: boolean;
  readonly entry: IntersectionObserverEntry | null;
}

/** Tracks whether an element enters the viewport. */
export function useIntersectionObserver<T extends HTMLElement>(
  ref: RefObject<T>,
  options: IntersectionObserverInit = {}
): IntersectionResult {
  const [result, setResult] = useState<IntersectionResult>({
    isIntersecting: false,
    entry: null,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      setResult({ isIntersecting: entry.isIntersecting, entry });
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, options.root, options.rootMargin, options.threshold]);

  return result;
}
