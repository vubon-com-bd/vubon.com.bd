/**
 * Cash on Delivery Constants (EXTENDS common/types)
 * @module shared-constants/business/payment/cash-on-delivery.constants
 */

import { TYPES } from '../../common/types.constants';

export const CASH_ON_DELIVERY = {
  // Base types from common
  ...TYPES,

  // COD specific
  DEFAULT_CURRENCY: 'BDT',
  COD_CACHE_TTL: 3600,
  MAX_COD_AMOUNT: 50000,
  MIN_COD_AMOUNT: 1,

  // COD status
  COD_STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    COLLECTED: 'collected',
    NOT_COLLECTED: 'not_collected',
    PARTIAL_COLLECTED: 'partial_collected',
  } as const,

  // COD type
  COD_TYPE: {
    FULL: 'full',
    PARTIAL: 'partial',
    ADVANCE: 'advance',
    REMAINING: 'remaining',
  } as const,

  // COD validation
  COD_VALIDATION: {
    MAX_ORDER_AMOUNT: 50000,
    MIN_ORDER_AMOUNT: 0,
    REQUIRES_PHONE: true,
    REQUIRES_ADDRESS: true,
    REQUIRES_ID: false,
  } as const,

  // COD availability
  COD_AVAILABILITY: {
    ALLOWED_DIVISIONS: [
      'ঢাকা',
      'চট্টগ্রাম',
      'রাজশাহী',
      'খুলনা',
      'বরিশাল',
      'সিলেট',
      'রংপুর',
      'ময়মনসিংহ',
    ],
    EXCLUDED_AREAS: ['হিলি', 'টেকনাফ'],
    EXTRA_CHARGE: 50,
    FREE_ABOVE_AMOUNT: 2000,
  } as const,
} as const;

export type CodStatus =
  (typeof CASH_ON_DELIVERY.COD_STATUS)[keyof typeof CASH_ON_DELIVERY.COD_STATUS];
export type CodType = (typeof CASH_ON_DELIVERY.COD_TYPE)[keyof typeof CASH_ON_DELIVERY.COD_TYPE];

export const COD_STATUS_LABELS: Record<CodStatus, string> = {
  pending: 'Pending',
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed',
  cancelled: 'Cancelled',
  collected: 'Collected',
  not_collected: 'Not Collected',
  partial_collected: 'Partial Collected',
};

export const COD_STATUS_COLORS: Record<CodStatus, string> = {
  pending: '#eab308',
  processing: '#60a5fa',
  completed: '#22c55e',
  failed: '#ef4444',
  cancelled: '#dc2626',
  collected: '#22c55e',
  not_collected: '#ef4444',
  partial_collected: '#f59e0b',
};
