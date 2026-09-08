import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { USER_STATUS } from '../../user/user-status.constants';
import { PAYMENT_RECURRING } from './payment-recurring.constants';
import { PAYMENT_STATUS } from './payment-status.constants';

export const PAYMENT_SUBSCRIPTION = {
  STATUS: {
    ...COMMON_STATUS,
    TRIAL: 'trial',
    ACTIVE: 'active',
    PAUSED: 'paused',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired',
    OVERDUE: 'overdue',
    GRACE_PERIOD: 'grace_period',
  },
  TYPES: {
    ...COMMON_TYPES,
    BASIC: 'basic',
    PREMIUM: 'premium',
    ENTERPRISE: 'enterprise',
    CUSTOM: 'custom',
  },
  USER_STATUS: { ...USER_STATUS },
  PAYMENT_RECURRING: { ...PAYMENT_RECURRING },
  PAYMENT_STATUS: { ...PAYMENT_STATUS },
  TRIAL_PERIOD_DAYS: 14,
  GRACE_PERIOD_DAYS: 7,
  CANCELLATION_NOTICE_DAYS: 30,
  MAX_SUBSCRIPTIONS_PER_USER: 5,
} as const;
