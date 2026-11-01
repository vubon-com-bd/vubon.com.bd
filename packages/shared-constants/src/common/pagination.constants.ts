export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MIN_LIMIT: 1,
  MAX_LIMIT: 100,
  DEFAULT_OFFSET: 0,
} as const;

export type PaginationType = typeof PAGINATION;
