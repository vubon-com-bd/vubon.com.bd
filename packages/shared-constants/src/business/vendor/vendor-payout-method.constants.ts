import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { PAYMENT_METHOD } from '../payment/payment-method.constants';
import { VENDOR_BANK_ACCOUNT } from './vendor-bank-account.constants';

export const VENDOR_PAYOUT_METHOD = {
  TYPES: {
    ...COMMON_TYPES,
    ...PAYMENT_METHOD.TYPES,
    BANK_TRANSFER: 'bank_transfer',
    MOBILE_BANKING: 'mobile_banking',
    CASH: 'cash',
    CHECK: 'check',
    WIRE: 'wire',
  },
  PAYMENT_METHOD: { ...PAYMENT_METHOD },
  VENDOR_BANK_ACCOUNT: { ...VENDOR_BANK_ACCOUNT },
  PAYOUT_METHOD_PRIORITY: {
    HIGH: 1,
    MEDIUM: 2,
    LOW: 3,
  },
  MAX_METHODS_PER_VENDOR: 3,
} as const;
