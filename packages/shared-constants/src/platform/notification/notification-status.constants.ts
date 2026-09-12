import { STATUS as COMMON_STATUS } from '../../common/status.constants';

export const NOTIFICATION_STATUS = {
  ...COMMON_STATUS,
  PENDING: 'pending',
  PROCESSING: 'processing',
  QUEUED: 'queued',
  SENT: 'sent',
  DELIVERED: 'delivered',
  READ: 'read',
  FAILED: 'failed',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
  ARCHIVED: 'archived',
  DISMISSED: 'dismissed',
} as const;
