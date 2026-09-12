import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { ORDER_RETURN } from '../checkout/order-return.constants';
import { PAYMENT_STATUS } from './payment-status.constants';

export const PAYMENT_REFUND = {
  STATUS: {
    ...COMMON_STATUS,
    REQUESTED: 'requested',
    APPROVED: 'approved',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    REJECTED: 'rejected',
    PARTIAL: 'partial',
  },
  TYPES: {
    ...COMMON_TYPES,
    FULL: 'full',
    PARTIAL: 'partial',
    PRO_RATA: 'pro_rata',
    MANUAL: 'manual',
    AUTOMATIC: 'automatic',
  },
  ORDER_RETURN: { ...ORDER_RETURN },
  PAYMENT_STATUS: { ...PAYMENT_STATUS },
  REFUND_WINDOW_DAYS: 30,
  REFUND_PROCESSING_DAYS: 7,
  RESTOCKING_FEE_PERCENTAGE: 10,
  MAX_REFUND_PERCENTAGE: 100,
} as const;
