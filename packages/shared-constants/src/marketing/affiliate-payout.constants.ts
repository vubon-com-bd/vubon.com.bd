import { STATUS as COMMON_STATUS } from '../common/status.constants';
import { PAYMENT_METHOD } from '../business/payment/payment-method.constants';

export const AFFILIATE_PAYOUT = {
  STATUS: {
    ...COMMON_STATUS,
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
  },
  PAYMENT_METHOD: { ...PAYMENT_METHOD },
  PAYOUT_METHODS: {
    BANK_TRANSFER: 'bank_transfer',
    BKASH: 'bkash',
    NAGAD: 'nagad',
    ROCKET: 'rocket',
    PAYPAL: 'paypal',
  },
  PAYOUT_FREQUENCY: {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    BI_WEEKLY: 'bi_weekly',
    MONTHLY: 'monthly',
  },
  MIN_PAYOUT_AMOUNT: 500,
  MAX_PAYOUT_AMOUNT: 1000000,
  PAYOUT_PROCESSING_DAYS: 3,
} as const;
