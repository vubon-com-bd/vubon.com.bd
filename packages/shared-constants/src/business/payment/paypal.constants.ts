import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { PAYMENT_METHOD } from './payment-method.constants';
import { CURRENCY } from '../../common/currency.constants';

export const PAYPAL = {
  TYPES: {
    ...COMMON_TYPES,
    ...PAYMENT_METHOD.TYPES,
    STANDARD: 'standard',
    EXPRESS: 'express',
    PAYMENT_WALLET: 'payment_wallet',
  },
  PAYMENT_METHOD: { ...PAYMENT_METHOD },
  CURRENCY: { ...CURRENCY },
  SUPPORTED_CURRENCIES: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'],
  API_VERSION: 'v2',
  WEBHOOK_EVENTS: [
    'PAYMENT.CAPTURE.COMPLETED',
    'PAYMENT.CAPTURE.DENIED',
    'PAYMENT.REFUND.COMPLETED',
  ],
  TIMEOUT_SECONDS: 30,
  MAX_RETRY: 3,
} as const;
