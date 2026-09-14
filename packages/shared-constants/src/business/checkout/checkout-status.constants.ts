import { STATUS as COMMON_STATUS } from '../../common/status.constants';

export const CHECKOUT_STATUS = {
  PENDING: COMMON_STATUS.PENDING,
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  ABANDONED: 'abandoned',
  FAILED: 'failed',
  EXPIRED: COMMON_STATUS.EXPIRED,
  CANCELLED: 'cancelled',
} as const;

export type CheckoutStatusType = (typeof CHECKOUT_STATUS)[keyof typeof CHECKOUT_STATUS];
