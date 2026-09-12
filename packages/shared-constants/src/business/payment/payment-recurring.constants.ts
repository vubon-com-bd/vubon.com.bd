import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { PAYMENT_STATUS } from './payment-status.constants';

export const PAYMENT_RECURRING = {
  STATUS: {
    ...COMMON_STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PAUSED: 'paused',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired',
    FAILED: 'failed',
  },
  TYPES: {
    ...COMMON_TYPES,
    DAILY: 'daily',
    WEEKLY: 'weekly',
    BI_WEEKLY: 'bi_weekly',
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    SEMI_ANNUAL: 'semi_annual',
    ANNUAL: 'annual',
    CUSTOM: 'custom',
  },
  PAYMENT_STATUS: { ...PAYMENT_STATUS },
  MAX_RETRY_ATTEMPTS: 5,
  RETRY_INTERVAL_DAYS: 3,
  GRACE_PERIOD_DAYS: 7,
} as const;
