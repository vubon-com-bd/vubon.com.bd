import { STATUS as COMMON_STATUS } from '../common/status.constants';

export const NEWSLETTER_STATUS = {
  ...COMMON_STATUS,
  DRAFT: 'draft',
  SCHEDULED: 'scheduled',
  SENDING: 'sending',
  SENT: 'sent',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
} as const;
