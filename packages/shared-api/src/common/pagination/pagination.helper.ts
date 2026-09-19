import type { PageMeta, PageRequest } from './pagination.types';

/** Compute pagination meta from total + request. */
export function computePageMeta(request: PageRequest, total: number): PageMeta {
  const totalPages = request.limit > 0 ? Math.ceil(total / request.limit) : 0;
  return {
    page: request.page,
    limit: request.limit,
    total,
    totalPages,
    hasNext: request.page < totalPages,
    hasPrev: request.page > 1,
  };
}

/** Clamp a page number to valid range. */
export function clampPage(page: number, totalPages: number): number {
  if (page < 1) return 1;
  if (page > totalPages) return Math.max(totalPages, 1);
  return page;
}
