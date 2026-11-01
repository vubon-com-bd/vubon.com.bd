/**
 * Order Note Constants
 * @module shared-constants/business/order
 */
export const ORDER_NOTE = {
  MAX_LENGTH: 1000,
  MIN_LENGTH: 0,
  CUSTOMER_MAX_LENGTH: 1000,
  INTERNAL_MAX_LENGTH: 2000,
} as const;

export type OrderNoteType = typeof ORDER_NOTE;
