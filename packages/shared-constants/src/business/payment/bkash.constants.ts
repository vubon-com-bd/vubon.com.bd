import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { PAYMENT_METHOD } from './payment-method.constants';
import { CURRENCY } from '../../common/currency.constants';

export const BKASH = {
  TYPES: {
    ...COMMON_TYPES,
    ...PAYMENT_METHOD.TYPES,
    SEND_MONEY: 'send_money',
    PAYMENT: 'payment',
    CHECKOUT: 'checkout',
    AGENT: 'agent',
  },
  PAYMENT_METHOD: { ...PAYMENT_METHOD },
  CURRENCY: { ...CURRENCY },
  SUPPORTED_CURRENCIES: ['BDT'],
  TRANSACTION_TYPES: ['SEND', 'PAYMENT', 'REFUND', 'WITHDRAW'],
  API_VERSION: 'v1.2',
  TIMEOUT_SECONDS: 60,
  MAX_TRANSACTION_AMOUNT: 250000,
  MIN_TRANSACTION_AMOUNT: 1,
} as const;
