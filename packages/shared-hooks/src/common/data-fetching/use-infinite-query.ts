import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseInfiniteQueryOptions<T = unknown> {
  enabled?: boolean;
  initialPage?: number;
  limit?: number;
  onSuccess?: (data: T[]) => void;
  onError?: (error: Error) => void;
}

export interface UseInfiniteQueryResult<T = unknown> {
  data: T[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isFetching: boolean;
  error: Error | null;
  loadMore: () => Promise<void>;
  hasMore: boolean;
  page: number;
  totalPages: number;
  reset: () => void;
}

export function useInfiniteQuery<T = unknown>(
  key: string | string[],
  fetcher: (page: number, limit: number) => Promise<{ items: T[]; total: number }>,
  options: UseInfiniteQueryOptions<T> = {}
): UseInfiniteQueryResult<T> {
  const { enabled = true, initialPage = 1, limit = 10, onSuccess, onError } = options;

  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const dataRef = useRef<T[]>([]);

  const fetchData = useCallback(
    async (pageNum: number): Promise<void> => {
      try {
        setIsFetching(true);
        setIsError(false);
        setError(null);

        const result = await fetcher(pageNum, limit);

        if (pageNum === initialPage) {
          setData(result.items);
          dataRef.current = result.items;
        } else {
          const newData = [...dataRef.current, ...result.items];
          setData(newData);
          dataRef.current = newData;
        }

        const totalPages = Math.ceil(result.total / limit);
        setTotalPages(totalPages);
        setHasMore(pageNum < totalPages);
        setIsSuccess(true);
        onSuccess?.(result.items);
      } catch (err) {
        const errorObj = err as Error;
        setError(errorObj);
        setIsError(true);
        onError?.(errorObj);
      } finally {
        setIsLoading(false);
        setIsFetching(false);
      }
    },
    [fetcher, limit, initialPage, onSuccess, onError]
  );

  useEffect(() => {
    if (!enabled) return;
    setIsLoading(true);
    fetchData(initialPage);
  }, [enabled, initialPage, fetchData]);

  const loadMore = useCallback(async (): Promise<void> => {
    if (!hasMore || isFetching) return;
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchData(nextPage);
  }, [hasMore, isFetching, page, fetchData]);

  const reset = useCallback((): void => {
    setData([]);
    dataRef.current = [];
    setPage(initialPage);
    setTotalPages(0);
    setHasMore(true);
    setIsError(false);
    setError(null);
    setIsSuccess(false);
  }, [initialPage]);

  return {
    data,
    isLoading,
    isError,
    isSuccess,
    isFetching,
    error,
    loadMore,
    hasMore,
    page,
    totalPages,
    reset,
  };
}
