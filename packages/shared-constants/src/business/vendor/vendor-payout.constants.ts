import { VENDOR_PAYOUT_STATUS } from './vendor-payout-status.constants';

export const VENDOR_PAYOUT_METHOD = {
  BANK_TRANSFER: 'bank_transfer',
  MOBILE_BANKING: 'mobile_banking',
  PAYPAL: 'paypal',
  STRIPE: 'stripe',
  WISE: 'wise',
  PAYONEER: 'payoneer',
  CASH: 'cash',
  CHEQUE: 'cheque',
} as const;

export const VENDOR_PAYOUT_CYCLE = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  BIWEEKLY: 'biweekly',
  MONTHLY: 'monthly',
  ON_DEMAND: 'on_demand',
} as const;

export const VENDOR_PAYOUT = {
  MIN_AMOUNT: 100,
  MAX_AMOUNT: 10000000,
  HOLD_DAYS: 7,
  PROCESSING_DAYS: 3,
  DEFAULT_CYCLE: VENDOR_PAYOUT_CYCLE.WEEKLY,
  AUTO_PAYOUT: false,
  REQUIRE_APPROVAL: true,
  MAX_PAYOUTS_PER_DAY: 1,
} as const;

export const VENDOR_PAYOUT_LIMIT = {
  STATUS: VENDOR_PAYOUT_STATUS,
  MIN_AMOUNT: 100,
  MAX_AMOUNT: 10000000,
  HOLD_DAYS: 7,
} as const;

export type VendorPayoutMethodType =
  (typeof VENDOR_PAYOUT_METHOD)[keyof typeof VENDOR_PAYOUT_METHOD];
export type VendorPayoutCycleType = (typeof VENDOR_PAYOUT_CYCLE)[keyof typeof VENDOR_PAYOUT_CYCLE];
