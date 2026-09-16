'use client';
import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface PaginationProps extends HTMLAttributes<HTMLElement> {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly onPageChange: (page: number) => void;
  readonly siblingCount?: number;
}

function buildPages(current: number, total: number, siblings: number): number[] {
  const totalNumbers = siblings * 2 + 5;
  if (total <= totalNumbers) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const left = Math.max(2, current - siblings);
  const right = Math.min(total - 1, current + siblings);
  const middle: number[] = [];
  for (let i = left; i <= right; i++) middle.push(i);

  const out: number[] = [1];
  if (left > 2) out.push(-1);
  out.push(...middle);
  if (right < total - 1) out.push(-1);
  out.push(total);
  return out;
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  function Pagination(
    { currentPage, totalPages, onPageChange, siblingCount = 1, className, ...rest },
    ref,
  ) {
    if (totalPages <= 1) return null;
    const pages = buildPages(currentPage, totalPages, siblingCount);

    return (
      <nav
        ref={ref}
        role="navigation"
        aria-label="Pagination"
        className={cn('flex items-center justify-center gap-1', className)}
        {...rest}
      >
        <button
          type="button"
          aria-label="Previous page"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="rounded-md border border-slate-300 px-2.5 py-1 text-sm text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          ‹
        </button>
        {pages.map((p, i) =>
          p === -1 ? (
            <span
              key={`gap-${i}`}
              aria-hidden="true"
              className="px-2 text-slate-400"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              aria-current={p === currentPage ? 'page' : undefined}
              aria-label={`Page ${p}`}
              onClick={() => onPageChange(p)}
              className={cn(
                'min-w-[2rem] rounded-md border px-2.5 py-1 text-sm',
                p === currentPage
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-slate-300 text-slate-700 hover:bg-slate-100',
              )}
            >
              {p}
            </button>
          ),
        )}
        <button
          type="button"
          aria-label="Next page"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="rounded-md border border-slate-300 px-2.5 py-1 text-sm text-slate-700 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          ›
        </button>
      </nav>
    );
  },
);

Pagination.displayName = 'Pagination';
