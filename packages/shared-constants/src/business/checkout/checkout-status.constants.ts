import { STATUS as COMMON_STATUS } from '../../common/status.constants';

export const CHECKOUT_STATUS = {
  ...COMMON_STATUS,
  PENDING: 'pending',
  PROCESSING: 'processing',
  PAYMENT_PENDING: 'payment_pending',
  PAYMENT_COMPLETED: 'payment_completed',
  PAYMENT_FAILED: 'payment_failed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  EXPIRED: 'expired',
} as const;
