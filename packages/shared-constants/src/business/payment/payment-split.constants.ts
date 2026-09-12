import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { PAYMENT_STATUS } from './payment-status.constants';

export const PAYMENT_SPLIT = {
  STATUS: {
    ...COMMON_STATUS,
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    PARTIAL: 'partial',
  },
  TYPES: {
    ...COMMON_TYPES,
    EQUAL: 'equal',
    PERCENTAGE: 'percentage',
    FIXED_AMOUNT: 'fixed_amount',
    CUSTOM: 'custom',
  },
  PAYMENT_STATUS: { ...PAYMENT_STATUS },
  MAX_SPLIT_PARTIES: 10,
  MIN_SPLIT_AMOUNT: 1,
  SPLIT_SETTLEMENT_DAYS: 3,
} as const;
