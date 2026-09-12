import { useState, useEffect, type RefObject } from 'react';

export interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

export const useIntersectionObserver = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  options: UseIntersectionObserverOptions = {}
): IntersectionObserverEntry | undefined => {
  const { threshold = 0, root = null, rootMargin = '0%', freezeOnceVisible = false } = options;
  const [entry, setEntry] = useState<IntersectionObserverEntry>();

  const frozen = entry?.isIntersecting && freezeOnceVisible;

  useEffect(() => {
    if (frozen || !ref.current) return;
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e) setEntry(e);
      },
      { threshold, root, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold, root, rootMargin, frozen]);

  return entry;
};
