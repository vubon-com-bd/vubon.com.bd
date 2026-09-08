import { STATUS as COMMON_STATUS } from '../../common/status.constants';

export const PAYMENT_STATUS = {
  ...COMMON_STATUS,
  PENDING: 'pending',
  PROCESSING: 'processing',
  SUCCESS: 'success',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
  PARTIAL_REFUND: 'partial_refund',
  CHARGEBACK: 'chargeback',
  DISPUTED: 'disputed',
  ON_HOLD: 'on_hold',
  EXPIRED: 'expired',
  AUTHORIZED: 'authorized',
  CAPTURED: 'captured',
  SETTLED: 'settled',
} as const;
