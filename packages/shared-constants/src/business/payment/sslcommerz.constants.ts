import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { PAYMENT_METHOD } from './payment-method.constants';
import { CURRENCY } from '../../common/currency.constants';

export const SSLCOMMERZ = {
  TYPES: {
    ...COMMON_TYPES,
    ...PAYMENT_METHOD.TYPES,
    HOSTED: 'hosted',
    EASY_CHECKOUT: 'easy_checkout',
    QR_PAYMENT: 'qr_payment',
  },
  PAYMENT_METHOD: { ...PAYMENT_METHOD },
  CURRENCY: { ...CURRENCY },
  SUPPORTED_CURRENCIES: ['BDT', 'USD', 'EUR'],
  TRANSACTION_TYPES: ['SALE', 'REFUND', 'AUTH'],
  API_VERSION: 'v1.2',
  TIMEOUT_SECONDS: 120,
  MAX_RETRY: 3,
} as const;
