import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { PAYMENT_METHOD } from './payment-method.constants';
import { CURRENCY } from '../../common/currency.constants';

export const BANK_TRANSFER = {
  TYPES: {
    ...COMMON_TYPES,
    ...PAYMENT_METHOD.TYPES,
    WIRE_TRANSFER: 'wire_transfer',
    ACH: 'ach',
    RTGS: 'rtgs',
    NEFT: 'neft',
    BEFTN: 'beftn',
  },
  PAYMENT_METHOD: { ...PAYMENT_METHOD },
  CURRENCY: { ...CURRENCY },
  SUPPORTED_CURRENCIES: ['BDT', 'USD', 'EUR', 'GBP'],
  BANK_LIST: [
    'Sonali Bank',
    'Janata Bank',
    'Agrani Bank',
    'Rupali Bank',
    'BRAC Bank',
    'DBBL',
    'City Bank',
    'Standard Chartered',
  ],
  PROCESSING_DAYS: [1, 2, 3, 5],
  MIN_TRANSFER_AMOUNT: 100,
  MAX_TRANSFER_AMOUNT: 5000000,
} as const;
