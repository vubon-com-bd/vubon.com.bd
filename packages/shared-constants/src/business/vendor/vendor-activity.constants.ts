import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { VENDOR_STATUS } from './vendor-status.constants';

export const VENDOR_ACTIVITY = {
  TYPES: {
    ...COMMON_TYPES,
    LOGIN: 'login',
    LOGOUT: 'logout',
    PRODUCT_CREATE: 'product_create',
    PRODUCT_UPDATE: 'product_update',
    PRODUCT_DELETE: 'product_delete',
    ORDER_RECEIVED: 'order_received',
    ORDER_PROCESSED: 'order_processed',
    ORDER_FULFILLED: 'order_fulfilled',
    PAYOUT_REQUESTED: 'payout_requested',
    PAYOUT_RECEIVED: 'payout_received',
    PROFILE_UPDATE: 'profile_update',
    SETTINGS_UPDATE: 'settings_update',
  },
  VENDOR_STATUS: { ...VENDOR_STATUS },
  ACTIVITY_SEVERITY: {
    INFO: 'info',
    WARNING: 'warning',
    ERROR: 'error',
    CRITICAL: 'critical',
  },
  ACTIVITY_RETENTION_DAYS: 365,
  MAX_ACTIVITY_PER_VENDOR: 10000,
} as const;
