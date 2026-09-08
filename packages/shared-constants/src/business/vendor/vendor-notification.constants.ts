import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { NOTIFICATION_TYPES } from '../../common/notification.constants';
import { VENDOR_STATUS } from './vendor-status.constants';

export const VENDOR_NOTIFICATION = {
  STATUS: {
    ...COMMON_STATUS,
    SENT: 'sent',
    DELIVERED: 'delivered',
    READ: 'read',
    FAILED: 'failed',
  },
  NOTIFICATION_TYPES: {
    ...NOTIFICATION_TYPES,
    ORDER_RECEIVED: 'order_received',
    PAYMENT_RECEIVED: 'payment_received',
    PAYOUT_COMPLETED: 'payout_completed',
    REVIEW_RECEIVED: 'review_received',
    POLICY_UPDATE: 'policy_update',
    SUSPENSION: 'suspension',
    APPROVAL: 'approval',
  },
  VENDOR_STATUS: { ...VENDOR_STATUS },
  NOTIFICATION_CHANNELS: {
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
    IN_APP: 'in_app',
    DASHBOARD: 'dashboard',
  },
  MAX_NOTIFICATIONS_PER_VENDOR: 1000,
  RETENTION_DAYS: 90,
} as const;
