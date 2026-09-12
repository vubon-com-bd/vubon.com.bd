import { useState, useCallback, useRef } from 'react';

export interface UseInfiniteScrollProps {
  fetchMore: () => Promise<void>;
  hasMore: boolean;
  threshold?: number;
  rootMargin?: string;
}

export interface UseInfiniteScrollReturn {
  loadMoreRef: (node: HTMLElement | null) => void;
  isFetching: boolean;
}

export const useInfiniteScroll = ({
  fetchMore,
  hasMore,
  threshold = 0.1,
  rootMargin = '100px',
}: UseInfiniteScrollProps): UseInfiniteScrollReturn => {
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const loadMoreRef = useCallback(
    (node: HTMLElement | null) => {
      if (isFetching) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        async (entries) => {
          if (entries[0]?.isIntersecting && hasMore && !isFetching) {
            setIsFetching(true);
            try {
              await fetchMore();
            } finally {
              setIsFetching(false);
            }
          }
        },
        { threshold, rootMargin }
      );

      if (node) observerRef.current.observe(node);
    },
    [isFetching, hasMore, fetchMore, threshold, rootMargin]
  );

  return { loadMoreRef, isFetching };
};
