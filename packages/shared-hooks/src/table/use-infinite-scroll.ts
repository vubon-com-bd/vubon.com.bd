import { useEffect, useRef } from 'react';

export interface InfiniteScrollOptions {
  readonly rootMargin?: string;
  readonly threshold?: number;
  readonly enabled?: boolean;
}

/**
 * IntersectionObserver-based infinite scroll trigger.
 * Attach `sentinelRef` to an element at the bottom of the list.
 */
export function useInfiniteScroll(
  onLoadMore: () => void,
  options: InfiniteScrollOptions = {}
): { readonly sentinelRef: React.RefObject<HTMLDivElement> } {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const onLoadMoreRef = useRef(onLoadMore);
  onLoadMoreRef.current = onLoadMore;

  useEffect(() => {
    if (options.enabled === false) return;
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) onLoadMoreRef.current();
      },
      {
        rootMargin: options.rootMargin ?? '200px',
        threshold: options.threshold ?? 0,
      }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [options.rootMargin, options.threshold, options.enabled]);

  return { sentinelRef };
}
