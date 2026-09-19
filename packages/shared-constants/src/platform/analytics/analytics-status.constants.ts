import { STATUS as COMMON_STATUS } from '../../common/status.constants';

export const ANALYTICS_STATUS = {
  ACTIVE: COMMON_STATUS.ACTIVE,
  INACTIVE: COMMON_STATUS.INACTIVE,
  PENDING: COMMON_STATUS.PENDING,
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  ARCHIVED: COMMON_STATUS.ARCHIVED,
} as const;

export type AnalyticsStatusType = (typeof ANALYTICS_STATUS)[keyof typeof ANALYTICS_STATUS];
