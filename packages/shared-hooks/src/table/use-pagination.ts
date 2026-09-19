import { useCallback, useMemo, useState } from 'react';

export interface PaginationState {
  readonly page: number;
  readonly pageSize: number;
  readonly total: number;
}

export interface PaginationActions {
  readonly setPage: (page: number) => void;
  readonly setPageSize: (size: number) => void;
  readonly setTotal: (total: number) => void;
  readonly next: () => void;
  readonly prev: () => void;
  readonly first: () => void;
  readonly last: () => void;
  readonly reset: () => void;
}

export interface PaginationResult extends PaginationState, PaginationActions {
  readonly totalPages: number;
  readonly hasNext: boolean;
  readonly hasPrev: boolean;
  readonly offset: number;
}

export function usePagination(initialPage = 1, initialPageSize = 20): PaginationResult {
  const [page, setPageState] = useState(initialPage);
  const [pageSize, setPageSizeState] = useState(initialPageSize);
  const [total, setTotal] = useState(0);

  const totalPages = useMemo(
    () => (pageSize > 0 ? Math.max(1, Math.ceil(total / pageSize)) : 1),
    [total, pageSize]
  );

  const setPage = useCallback(
    (p: number) => setPageState(Math.max(1, Math.min(p, totalPages))),
    [totalPages]
  );
  const setPageSize = useCallback((size: number) => {
    setPageSizeState(Math.max(1, size));
    setPageState(1);
  }, []);
  const next = useCallback(() => setPage(page + 1), [page, setPage]);
  const prev = useCallback(() => setPage(page - 1), [page, setPage]);
  const first = useCallback(() => setPage(1), [setPage]);
  const last = useCallback(() => setPage(totalPages), [totalPages, setPage]);
  const reset = useCallback(() => {
    setPageState(initialPage);
    setPageSizeState(initialPageSize);
    setTotal(0);
  }, [initialPage, initialPageSize]);

  return {
    page,
    pageSize,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
    offset: (page - 1) * pageSize,
    setPage,
    setPageSize,
    setTotal,
    next,
    prev,
    first,
    last,
    reset,
  };
}
