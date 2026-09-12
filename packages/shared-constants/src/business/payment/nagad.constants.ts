import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { PAYMENT_METHOD } from './payment-method.constants';
import { CURRENCY } from '../../common/currency.constants';

export const NAGAD = {
  TYPES: {
    ...COMMON_TYPES,
    ...PAYMENT_METHOD.TYPES,
    SEND_MONEY: 'send_money',
    PAYMENT: 'payment',
    MOBILE_RECHARGE: 'mobile_recharge',
    AGENT: 'agent',
  },
  PAYMENT_METHOD: { ...PAYMENT_METHOD },
  CURRENCY: { ...CURRENCY },
  SUPPORTED_CURRENCIES: ['BDT'],
  TRANSACTION_TYPES: ['SEND', 'PAYMENT', 'REFUND'],
  API_VERSION: 'v1.0',
  TIMEOUT_SECONDS: 60,
  MAX_TRANSACTION_AMOUNT: 200000,
  MIN_TRANSACTION_AMOUNT: 1,
} as const;
