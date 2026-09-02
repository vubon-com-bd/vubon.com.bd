import { useState, useMemo, useCallback } from 'react';

export interface UsePaginationOptions {
  totalItems: number;
  initialPage?: number;
  itemsPerPage?: number;
  maxVisiblePages?: number;
}

export interface UsePaginationResult {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  startIndex: number;
  endIndex: number;
  currentItems: <T>(items: T[]) => T[];
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  visiblePages: number[];
  setItemsPerPage: (itemsPerPage: number) => void;
}

export function usePagination(options: UsePaginationOptions): UsePaginationResult {
  const {
    totalItems,
    initialPage = 1,
    itemsPerPage: initialItemsPerPage = 10,
    maxVisiblePages = 5,
  } = options;

  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState<number>(initialItemsPerPage);

  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  // Ensure current page is within bounds
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);

  const startIndex = (safePage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const hasNextPage = safePage < totalPages;
  const hasPreviousPage = safePage > 1;

  const currentItems = useCallback(
    <T>(items: T[]): T[] => {
      return items.slice(startIndex, endIndex);
    },
    [startIndex, endIndex]
  );

  const goToPage = useCallback(
    (page: number): void => {
      const targetPage = Math.min(Math.max(page, 1), totalPages);
      setCurrentPage(targetPage);
    },
    [totalPages]
  );

  const goToNextPage = useCallback((): void => {
    if (hasNextPage) {
      setCurrentPage(safePage + 1);
    }
  }, [hasNextPage, safePage]);

  const goToPreviousPage = useCallback((): void => {
    if (hasPreviousPage) {
      setCurrentPage(safePage - 1);
    }
  }, [hasPreviousPage, safePage]);

  const goToFirstPage = useCallback((): void => {
    setCurrentPage(1);
  }, []);

  const goToLastPage = useCallback((): void => {
    setCurrentPage(totalPages);
  }, [totalPages]);

  const handleSetItemsPerPage = useCallback((newItemsPerPage: number): void => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  }, []);

  // Calculate visible page numbers
  const visiblePages = useMemo((): number[] => {
    if (totalPages === 0) return [];

    let start = Math.max(1, safePage - Math.floor(maxVisiblePages / 2));
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }, [safePage, totalPages, maxVisiblePages]);

  return {
    currentPage: safePage,
    totalPages,
    itemsPerPage,
    startIndex,
    endIndex,
    currentItems,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    hasNextPage,
    hasPreviousPage,
    visiblePages,
    setItemsPerPage: handleSetItemsPerPage,
  };
}
