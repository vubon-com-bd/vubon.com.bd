import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';

export const WEBHOOK = {
  STATUS: {
    ...COMMON_STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    DELIVERED: 'delivered',
    FAILED: 'failed',
    RETRYING: 'retrying',
  },
  TYPES: {
    ...COMMON_TYPES,
    ORDER: 'order',
    PAYMENT: 'payment',
    USER: 'user',
    VENDOR: 'vendor',
    PRODUCT: 'product',
    CUSTOM: 'custom',
  },
  WEBHOOK_PROVIDERS: {
    ZAPIER: 'zapier',
    MAKE: 'make',
    PABBLY: 'pabbly',
    CUSTOM: 'custom',
  },
  MAX_RETRY_ATTEMPTS: 5,
  RETRY_INTERVAL_MINUTES: 5,
  WEBHOOK_TIMEOUT_SECONDS: 30,
} as const;
