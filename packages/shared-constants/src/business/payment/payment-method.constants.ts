export const PAYMENT_METHOD = {
  CASH_ON_DELIVERY: 'cash_on_delivery',
  CARD: 'card',
  CREDIT_CARD: 'credit_card',
  DEBIT_CARD: 'debit_card',
  MOBILE_BANKING: 'mobile_banking',
  NET_BANKING: 'net_banking',
  BANK_TRANSFER: 'bank_transfer',
  WALLET: 'wallet',
  UPI: 'upi',
  CRYPTO: 'crypto',
  GIFT_CARD: 'gift_card',
  STORE_CREDIT: 'store_credit',
} as const;

export const PAYMENT_METHOD_TYPE = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  INSTANT: 'instant',
  DEFERRED: 'deferred',
} as const;

export type PaymentMethodType = (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD];
export type PaymentMethodTypeType = (typeof PAYMENT_METHOD_TYPE)[keyof typeof PAYMENT_METHOD_TYPE];
