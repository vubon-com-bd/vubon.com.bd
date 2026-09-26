import { STATUS as COMMON_STATUS } from '../../common/status.constants';

export const NOTIFICATION_STATUS = {
  DRAFT: COMMON_STATUS.DRAFT,
  PENDING: COMMON_STATUS.PENDING,
  QUEUED: 'queued',
  SCHEDULED: 'scheduled',
  SENDING: 'sending',
  SENT: 'sent',
  DELIVERED: 'delivered',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  EXPIRED: COMMON_STATUS.EXPIRED,
  ARCHIVED: COMMON_STATUS.ARCHIVED,
} as const;

export type NotificationStatusType = (typeof NOTIFICATION_STATUS)[keyof typeof NOTIFICATION_STATUS];
