import { STATUS as COMMON_STATUS } from '../../common/status.constants';

export const PAYMENT_STATUS = {
  PENDING: COMMON_STATUS.PENDING,
  PROCESSING: 'processing',
  AUTHORIZED: 'authorized',
  CAPTURED: 'captured',
  PAID: 'paid',
  FAILED: 'failed',
  DECLINED: 'declined',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
  PARTIALLY_REFUNDED: 'partially_refunded',
  CHARGEBACK: 'chargeback',
  EXPIRED: COMMON_STATUS.EXPIRED,
} as const;

export type PaymentStatusType = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];
