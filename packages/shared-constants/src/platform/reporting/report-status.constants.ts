import { STATUS as COMMON_STATUS } from '../../common/status.constants';

export const REPORT_STATUS = {
  ...COMMON_STATUS,
  DRAFT: 'draft',
  PENDING: 'pending',
  GENERATING: 'generating',
  COMPLETED: 'completed',
  FAILED: 'failed',
  SCHEDULED: 'scheduled',
  PAUSED: 'paused',
  CANCELLED: 'cancelled',
  ARCHIVED: 'archived',
  EXPIRED: 'expired',
} as const;
