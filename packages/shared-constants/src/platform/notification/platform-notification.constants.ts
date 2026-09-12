import { STATUS } from '../../common/status.constants';
import { PERMISSIONS } from '../../common/permissions.constants';
import { ADMIN_PERMISSIONS } from '../../admin/admin-permission.constants';
import { USER_STATUS } from '../../user/user-status.constants';
import { VENDOR_STATUS } from '../../business/vendor/vendor-status.constants';

export const PLATFORM_NOTIFICATION = {
  STATUS: {
    ...STATUS,
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    PROCESSING: 'processing',
    SENT: 'sent',
    DELIVERED: 'delivered',
    READ: 'read',
    FAILED: 'failed',
    EXPIRED: 'expired',
    ARCHIVED: 'archived',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    ...ADMIN_PERMISSIONS,
    VIEW: 'notification:view',
    SEND: 'notification:send',
    MANAGE: 'notification:manage',
    CONFIGURE: 'notification:configure',
    RECEIVE: 'notification:receive',
    DISMISS: 'notification:dismiss',
  },
  USER_STATUS: { ...USER_STATUS },
  VENDOR_STATUS: { ...VENDOR_STATUS },
  NOTIFICATION_TYPES: {
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
    IN_APP: 'in_app',
    WEBHOOK: 'webhook',
  },
  MAX_NOTIFICATIONS_PER_USER: 1000,
  MAX_RETRY_ATTEMPTS: 3,
  RETRY_INTERVAL_MINUTES: 5,
  NOTIFICATION_RETENTION_DAYS: 90,
  BATCH_SIZE: 100,
} as const;
