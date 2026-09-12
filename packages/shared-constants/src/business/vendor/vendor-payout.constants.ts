import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TRANSACTION } from '../payment/transaction.constants';
import { VENDOR_COMMISSION } from './vendor-commission.constants';

export const VENDOR_PAYOUT = {
  STATUS: {
    ...COMMON_STATUS,
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    ON_HOLD: 'on_hold',
  },
  TRANSACTION: { ...TRANSACTION },
  VENDOR_COMMISSION: { ...VENDOR_COMMISSION },
  PAYOUT_TYPES: {
    SCHEDULED: 'scheduled',
    MANUAL: 'manual',
    INSTANT: 'instant',
    BULK: 'bulk',
  },
  MIN_PAYOUT_AMOUNT: 100,
  MAX_PAYOUT_AMOUNT: 500000,
  PAYOUT_FREQUENCIES: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    BI_WEEKLY: 'bi_weekly',
    MONTHLY: 'monthly',
  },
  PAYOUT_PROCESSING_DAYS: 3,
  HOLD_PERIOD_DAYS: 7,
} as const;
