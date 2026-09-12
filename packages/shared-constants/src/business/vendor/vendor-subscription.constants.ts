import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { PAYMENT_SUBSCRIPTION } from '../payment/payment-subscription.constants';
import { VENDOR_TIER } from './vendor-tier.constants';

export const VENDOR_SUBSCRIPTION = {
  STATUS: {
    ...COMMON_STATUS,
    ...PAYMENT_SUBSCRIPTION.STATUS,
    TRIAL: 'trial',
    ACTIVE: 'active',
    PAUSED: 'paused',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired',
  },
  PAYMENT_SUBSCRIPTION: { ...PAYMENT_SUBSCRIPTION },
  VENDOR_TIER: { ...VENDOR_TIER },
  SUBSCRIPTION_TYPES: {
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    ANNUAL: 'annual',
    CUSTOM: 'custom',
  },
  TRIAL_PERIOD_DAYS: 14,
  GRACE_PERIOD_DAYS: 7,
  AUTO_RENEW: true,
  CANCELLATION_NOTICE_DAYS: 30,
} as const;
