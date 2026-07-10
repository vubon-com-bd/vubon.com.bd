export * from './seo';
export * from './env';
export * from './oauth';
export * from './security';
export * from './otp/otp.config';

// ============================================================
// ✅ NEW: Pagination Configuration (Enterprise)
// ============================================================
export const PAGINATION_CONFIG = {
  /** Default page number (1-indexed) */
  DEFAULT_PAGE: 1,
  
  /** Default items per page */
  DEFAULT_LIMIT: 20,
  
  /** Maximum allowed items per page (prevents abuse) */
  MAX_LIMIT: 100,
  
  /** Maximum allowed items per page for admin endpoints */
  ADMIN_MAX_LIMIT: 500,
  
  /** Default sort field */
  DEFAULT_SORT_FIELD: 'createdAt',
  
  /** Default sort order */
  DEFAULT_SORT_ORDER: 'desc' as const,
} as const;

// ============================================================
// Type Export for Pagination Config
// ============================================================
export type PaginationConfig = typeof PAGINATION_CONFIG;
