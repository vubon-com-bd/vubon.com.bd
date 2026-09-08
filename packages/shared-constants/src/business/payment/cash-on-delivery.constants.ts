import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { PAYMENT_METHOD } from './payment-method.constants';
import { CURRENCY } from '../../common/currency.constants';

export const CASH_ON_DELIVERY = {
  TYPES: {
    ...COMMON_TYPES,
    ...PAYMENT_METHOD.TYPES,
    CASH: 'cash',
    CARD_ON_DELIVERY: 'card_on_delivery',
    MOBILE_ON_DELIVERY: 'mobile_on_delivery',
  },
  PAYMENT_METHOD: { ...PAYMENT_METHOD },
  CURRENCY: { ...CURRENCY },
  SUPPORTED_CURRENCIES: ['BDT', 'USD', 'EUR'],
  MAX_ORDER_AMOUNT: 500000,
  MIN_ORDER_AMOUNT: 0,
  DELIVERY_CHARGE: 100,
  COLLECTION_CHARGE_PERCENTAGE: 1.5,
  DAILY_COLLECTION_LIMIT: 100000,
} as const;
