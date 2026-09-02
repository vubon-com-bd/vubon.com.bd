import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseInfiniteScrollOptions {
  threshold?: number;
  initialPage?: number;
  enabled?: boolean;
  onLoadMore?: () => Promise<void>;
}

export interface UseInfiniteScrollResult {
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  reset: () => void;
  setHasMore: (hasMore: boolean) => void;
  observerRef: React.RefObject<HTMLDivElement | null>;
  page: number;
}

export function useInfiniteScroll(options: UseInfiniteScrollOptions = {}): UseInfiniteScrollResult {
  const { threshold = 100, initialPage = 1, enabled = true, onLoadMore } = options;

  const [page, setPage] = useState<number>(initialPage);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const isLoadingRef = useRef<boolean>(false);

  const loadMore = useCallback(async (): Promise<void> => {
    if (isLoadingRef.current || !hasMore || !enabled) return;

    setIsLoading(true);
    isLoadingRef.current = true;
    setError(null);
    setIsError(false);

    try {
      if (onLoadMore) {
        await onLoadMore();
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      setError(err as Error);
      setIsError(true);
    } finally {
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  }, [hasMore, enabled, onLoadMore]);

  const reset = useCallback((): void => {
    setPage(initialPage);
    setHasMore(true);
    setIsLoading(false);
    setIsError(false);
    setError(null);
    isLoadingRef.current = false;
  }, [initialPage]);

  // Intersection Observer
  useEffect(() => {
    if (!enabled || !observerRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !isLoadingRef.current) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: `0px 0px ${threshold}px 0px`,
        threshold: 0,
      }
    );

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [enabled, hasMore, threshold, loadMore]);

  return {
    isLoading,
    isError,
    error,
    hasMore,
    loadMore,
    reset,
    setHasMore,
    observerRef,
    page,
  };
}
