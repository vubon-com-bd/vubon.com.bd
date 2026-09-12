import { TYPES as COMMON_TYPES } from '../../common/types.constants';
import { PAYMENT_METHODS as COMMON_PAYMENT_METHODS } from '../../common/payment-methods.constants';
import { CURRENCY } from '../../common/currency.constants';

export const PAYMENT_METHOD = {
  TYPES: {
    ...COMMON_TYPES,
    ...COMMON_PAYMENT_METHODS,
    SSLCOMMERZ: 'sslcommerz',
    BKASH: 'bkash',
    NAGAD: 'nagad',
    ROCKET: 'rocket',
    STRIPE: 'stripe',
    PAYPAL: 'paypal',
    BANK_TRANSFER: 'bank_transfer',
    CRYPTO: 'crypto',
    CASH_ON_DELIVERY: 'cash_on_delivery',
    MOBILE_BANKING: 'mobile_banking',
    CARD: 'card',
    DIGITAL_WALLET: 'digital_wallet',
    CREDIT_CARD: 'credit_card',
    DEBIT_CARD: 'debit_card',
    NET_BANKING: 'net_banking',
    UPI: 'upi',
  },
  CATEGORIES: {
    ...COMMON_PAYMENT_METHODS,
    GATEWAY: 'gateway',
    WALLET: 'wallet',
    BANK: 'bank',
    COD: 'cod',
    CRYPTO: 'crypto',
  },
  CURRENCY: { ...CURRENCY },
  SUPPORTED_CURRENCIES: ['BDT', 'USD', 'EUR', 'GBP'],
  TRANSACTION_FEE_PERCENTAGE: 2.5,
  MIN_TRANSACTION_AMOUNT: 1,
} as const;
