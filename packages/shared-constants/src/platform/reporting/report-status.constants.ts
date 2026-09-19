import { STATUS as COMMON_STATUS } from '../../common/status.constants';

export const REPORT_STATUS = {
  DRAFT: COMMON_STATUS.DRAFT,
  PENDING: COMMON_STATUS.PENDING,
  QUEUED: 'queued',
  GENERATING: 'generating',
  PROCESSING: 'processing',
  READY: 'ready',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  EXPIRED: COMMON_STATUS.EXPIRED,
  ARCHIVED: COMMON_STATUS.ARCHIVED,
} as const;

export type ReportStatusType = (typeof REPORT_STATUS)[keyof typeof REPORT_STATUS];
