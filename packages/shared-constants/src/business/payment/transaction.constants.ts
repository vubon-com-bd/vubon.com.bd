import { STATUS as COMMON_STATUS } from '../../common/status.constants';
import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { PAYMENT_STATUS } from './payment-status.constants';
import { CURRENCY } from '../../common/currency.constants';
import { USER_STATUS } from '../../user/user-status.constants';

export const TRANSACTION = {
  STATUS: {
    ...COMMON_STATUS,
    ...PAYMENT_STATUS,
    PENDING: 'pending',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    FAILED: 'failed',
    REVERSED: 'reversed',
    CHARGEBACK: 'chargeback',
    DISPUTED: 'disputed',
  },
  TYPES: {
    ...COMMON_TYPES,
    PAYMENT: 'payment',
    REFUND: 'refund',
    REVERSAL: 'reversal',
    ADJUSTMENT: 'adjustment',
    FEE: 'fee',
    TAX: 'tax',
  },
  PAYMENT_STATUS: { ...PAYMENT_STATUS },
  CURRENCY: { ...CURRENCY },
  USER_STATUS: { ...USER_STATUS },
  TRANSACTION_ID_PREFIX: 'TXN',
  TRANSACTION_ID_LENGTH: 12,
  MAX_TRANSACTION_AMOUNT: 9999999,
  MIN_TRANSACTION_AMOUNT: 0.01,
  TRANSACTION_RETENTION_DAYS: 2190, // 6 years
} as const;
