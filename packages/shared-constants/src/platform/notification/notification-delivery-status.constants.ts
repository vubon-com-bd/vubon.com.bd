import { STATUS as COMMON_STATUS } from '../../common/status.constants';

export const NOTIFICATION_DELIVERY_STATUS = {
  ...COMMON_STATUS,
  PENDING: 'pending',
  SENT: 'sent',
  DELIVERED: 'delivered',
  FAILED: 'failed',
  BOUNCED: 'bounced',
  REJECTED: 'rejected',
  SPAM: 'spam',
  EXPIRED: 'expired',
} as const;
