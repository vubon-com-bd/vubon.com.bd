/**
 * Order Source Constants
 * @module shared-constants/business/order
 *
 * Order কে/কোন সিস্টেম originate করেছে।
 */
export const ORDER_SOURCE = {
  CUSTOMER: 'customer',
  VENDOR: 'vendor',
  ADMIN: 'admin',
  API: 'api',
  IMPORT: 'import',
  BULK: 'bulk',
} as const;

export type OrderSourceType = (typeof ORDER_SOURCE)[keyof typeof ORDER_SOURCE];
