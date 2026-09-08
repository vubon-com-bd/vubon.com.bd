import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { PAYMENT_METHOD } from './payment-method.constants';
import { CURRENCY } from '../../common/currency.constants';

export const STRIPE = {
  TYPES: {
    ...COMMON_TYPES,
    ...PAYMENT_METHOD.TYPES,
    CARD: 'card',
    IDEAL: 'ideal',
    BANCONTACT: 'bancontact',
    GIROPAY: 'giropay',
    SOFORT: 'sofort',
    SEPA: 'sepa',
  },
  PAYMENT_METHOD: { ...PAYMENT_METHOD },
  CURRENCY: { ...CURRENCY },
  SUPPORTED_CURRENCIES: ['USD', 'EUR', 'GBP', 'BDT'],
  API_VERSION: '2023-08-16',
  WEBHOOK_EVENTS: [
    'payment_intent.succeeded',
    'payment_intent.payment_failed',
    'charge.refunded',
    'charge.dispute.created',
  ],
  TIMEOUT_SECONDS: 30,
  MAX_RETRY: 3,
} as const;
