export const VENDOR_SETTLEMENT_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  ON_HOLD: 'on_hold',
} as const;

export const VENDOR_SETTLEMENT_CYCLE = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  BIWEEKLY: 'biweekly',
  MONTHLY: 'monthly',
} as const;

export const VENDOR_SETTLEMENT = {
  MIN_AMOUNT: 1000,
  MAX_AMOUNT: 1000000,
  DEFAULT_CYCLE: 'weekly',
  HOLD_PERIOD_DAYS: 7,
  PROCESSING_SLA_HOURS: 48,
} as const;

export type VendorSettlementStatusType =
  (typeof VENDOR_SETTLEMENT_STATUS)[keyof typeof VENDOR_SETTLEMENT_STATUS];

export type VendorSettlementCycleType =
  (typeof VENDOR_SETTLEMENT_CYCLE)[keyof typeof VENDOR_SETTLEMENT_CYCLE];
