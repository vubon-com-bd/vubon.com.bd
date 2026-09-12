import { useState, useMemo, useCallback } from 'react';
import { PAGINATION } from '@vubon/shared-constants/src/common/pagination.constants';
import type { PaginationParams } from '@vubon/shared-types';

export interface UsePaginationProps {
  total: number;
  initialPage?: number;
  initialLimit?: number;
  maxLimit?: number;
}

export interface UsePaginationReturn {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  changeLimit: (limit: number) => void;
  reset: () => void;
  params: PaginationParams;
}

export const usePagination = ({
  total,
  initialPage = PAGINATION.DEFAULT_PAGE,
  initialLimit = PAGINATION.DEFAULT_LIMIT,
  maxLimit = PAGINATION.MAX_LIMIT,
}: UsePaginationProps): UsePaginationReturn => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(Math.min(initialLimit, maxLimit));

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / limit)), [total, limit]);
  const hasNext = useMemo(() => page < totalPages, [page, totalPages]);
  const hasPrevious = useMemo(() => page > 1, [page]);

  const goToPage = useCallback(
    (newPage: number) => setPage(Math.max(1, Math.min(newPage, totalPages))),
    [totalPages]
  );
  const nextPage = useCallback(() => {
    if (hasNext) setPage((p) => p + 1);
  }, [hasNext]);
  const previousPage = useCallback(() => {
    if (hasPrevious) setPage((p) => p - 1);
  }, [hasPrevious]);
  const changeLimit = useCallback(
    (newLimit: number) => {
      setLimit(Math.min(newLimit, maxLimit));
      setPage(1);
    },
    [maxLimit]
  );
  const reset = useCallback(() => {
    setPage(initialPage);
    setLimit(Math.min(initialLimit, maxLimit));
  }, [initialPage, initialLimit, maxLimit]);

  return {
    page,
    limit,
    total,
    totalPages,
    hasNext,
    hasPrevious,
    goToPage,
    nextPage,
    previousPage,
    changeLimit,
    reset,
    params: { page, limit },
  };
};
