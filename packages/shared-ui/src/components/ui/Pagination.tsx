/**
 * Pagination Component - Page navigation
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-ui/src/components/ui/Pagination
 * 
 * RULES:
 * ✅ ONLY UI pagination component - NO business logic
 * ✅ NO API calls, data fetching
 * ✅ Pure UI component
 * ✅ TypeScript strict
 */

import React from 'react';
import { cn } from '../../utils/cn';
import { Button } from './Button';

// ==================== Types ====================

export interface PaginationProps {
  /** Current active page (1-indexed) */
  currentPage: number;
  /** Total number of pages */
  totalPages: number;
  /** Callback when page changes */
  onPageChange: (page: number) => void;
  /** Number of sibling pages to show on each side */
  siblingCount ? : number;
  /** Whether to show first/last page buttons */
  showFirstLast ? : boolean;
  /** Whether to show page size selector */
  showPageSize ? : boolean;
  /** Available page size options */
  pageSizeOptions ? : number[];
  /** Current page size */
  pageSize ? : number;
  /** Callback when page size changes */
  onPageSizeChange ? : (pageSize: number) => void;
  /** Total items count (for showing summary) */
  totalItems ? : number;
  /** Additional CSS classes */
  className ? : string;
  /** Size variant */
  size ? : 'sm' | 'md';
  /** Whether to show compact version (for mobile) */
  compact ? : boolean;
}

export interface PaginationInfoProps {
  start: number;
  end: number;
  total: number;
  className ? : string;
}

// ==================== Helper Functions ====================

const range = (start: number, end: number): number[] => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

// ==================== Subcomponents ====================

/**
 * PaginationInfo - Shows "Showing X to Y of Z results"
 */
export const PaginationInfo: React.FC < PaginationInfoProps > = ({ start, end, total, className }) => {
  if (total === 0) {
    return <p className={cn('text-sm text-gray-500 dark:text-gray-400', className)}>No results</p>;
  }
  return (
    <p className={cn('text-sm text-gray-500 dark:text-gray-400', className)}>
      Showing <span className="font-medium">{start}</span> to{' '}
      <span className="font-medium">{end}</span> of{' '}
      <span className="font-medium">{total}</span> results
    </p>
  );
};

// ==================== Main Component ====================

/**
 * Pagination - Page navigation component
 * 
 * @example
 * // Basic pagination
 * <Pagination
 *   currentPage={page}
 *   totalPages={totalPages}
 *   onPageChange={setPage}
 * />
 * 
 * @example
 * // With page size selector and total items
 * <Pagination
 *   currentPage={page}
 *   totalPages={totalPages}
 *   onPageChange={setPage}
 *   showPageSize
 *   pageSize={limit}
 *   onPageSizeChange={setLimit}
 *   totalItems={totalItems}
 *   showFirstLast
 * />
 * 
 * @example
 * // Compact mobile version
 * <Pagination
 *   currentPage={page}
 *   totalPages={totalPages}
 *   onPageChange={setPage}
 *   compact
 * />
 */
export const Pagination: React.FC < PaginationProps > = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = false,
  showPageSize = false,
  pageSizeOptions = [10, 20, 30, 50, 100],
  pageSize = 10,
  onPageSizeChange,
  totalItems,
  className,
  size = 'md',
  compact = false,
}) => {
  const getPaginationRange = (): (number | 'dots')[] => {
    const totalPageNumbers = siblingCount * 2 + 3;
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;
    
    if (totalPageNumbers >= totalPages) {
      return range(1, totalPages);
    }
    
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, 'dots', totalPages];
    }
    
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(totalPages - rightItemCount + 1, totalPages);
      return [1, 'dots', ...rightRange];
    }
    
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, 'dots', ...middleRange, 'dots', totalPages];
    }
    
    return [];
  };
  
  const paginationRange = getPaginationRange();
  const buttonSize = size === 'sm' ? 'sm' : 'md';
  
  // Calculate start and end items for display
  const startItem = totalItems ? (currentPage - 1) * pageSize + 1 : 0;
  const endItem = totalItems ? Math.min(currentPage * pageSize, totalItems) : 0;
  
  if (totalPages <= 1 && !showPageSize) {
    return null;
  }
  
  return (
    <div className={cn('flex flex-col items-center gap-4 sm:flex-row sm:justify-between', className)}>
      {/* Pagination info (left side) */}
      {totalItems !== undefined && !compact && (
        <PaginationInfo start={startItem} end={endItem} total={totalItems} />
      )}

      {/* Pagination controls (right side) */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {/* First page button */}
        {showFirstLast && !compact && (
          <Button
            variant="outline"
            size={buttonSize}
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            aria-label="First page"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </Button>
        )}

        {/* Previous button */}
        <Button
          variant="outline"
          size={buttonSize}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          {compact ? (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          ) : (
            'Previous'
          )}
        </Button>

        {/* Page numbers */}
        {!compact && paginationRange.map((page, index) => {
          if (page === 'dots') {
            return (
              <span key={`dots-${index}`} className="px-2 text-gray-500 dark:text-gray-400">
                ...
              </span>
            );
          }
          return (
            <Button
              key={page}
              variant={currentPage === page ? 'primary' : 'outline'}
              size={buttonSize}
              onClick={() => onPageChange(page)}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </Button>
          );
        })}

        {/* Compact page indicator */}
        {compact && (
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
        )}

        {/* Next button */}
        <Button
          variant="outline"
          size={buttonSize}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          {compact ? (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          ) : (
            'Next'
          )}
        </Button>

        {/* Last page button */}
        {showFirstLast && !compact && (
          <Button
            variant="outline"
            size={buttonSize}
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            aria-label="Last page"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M4 5l7 7-7 7" />
            </svg>
          </Button>
        )}
      </div>

      {/* Page size selector */}
      {showPageSize && onPageSizeChange && !compact && (
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500 dark:text-gray-400">Show</label>
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-500 dark:text-gray-400">per page</span>
        </div>
      )}
    </div>
  );
};

Pagination.displayName = 'Pagination';
