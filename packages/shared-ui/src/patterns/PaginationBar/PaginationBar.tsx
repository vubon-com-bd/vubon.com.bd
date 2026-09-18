'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Pagination } from '../../components/navigation/Pagination';
import { cn } from '../../utils/cn';

export interface PaginationBarProps extends HTMLAttributes<HTMLDivElement> {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly totalItems?: number;
  readonly pageSize?: number;
  readonly onPageChange: (page: number) => void;
  readonly onPageSizeChange?: (size: number) => void;
  readonly pageSizeOptions?: readonly number[];
  readonly info?: ReactNode;
}

export const PaginationBar = forwardRef<HTMLDivElement, PaginationBarProps>(function PaginationBar(
  {
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    onPageChange,
    onPageSizeChange,
    pageSizeOptions = [10, 20, 50, 100],
    info,
    className,
    ...rest
  },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn('flex flex-wrap items-center justify-between gap-2 py-3', className)}
      {...rest}
    >
      <div className="flex items-center gap-2 text-xs text-slate-500">
        {info ??
          (totalItems !== undefined && (
            <span>
              {totalItems} item{totalItems === 1 ? '' : 's'}
            </span>
          ))}
        {pageSize !== undefined && onPageSizeChange && (
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            aria-label="Rows per page"
            className="rounded border border-slate-300 bg-white px-1 py-0.5 text-xs"
          >
            {pageSizeOptions.map((n) => (
              <option key={n} value={n}>
                {n} / page
              </option>
            ))}
          </select>
        )}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
});

PaginationBar.displayName = 'PaginationBar';
