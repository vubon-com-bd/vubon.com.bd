import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';

export const ORDER_CONFIG = Object.freeze({
  maxItemsPerOrder: getOptionalEnvInt('ORDER_MAX_ITEMS', 100),
  maxTotalAmount: getOptionalEnvInt('ORDER_MAX_TOTAL', 1000000),
  autoConfirmAfterPayment: getOptionalEnvBool('ORDER_AUTO_CONFIRM_PAYMENT', true),
  allowGuestCheckout: getOptionalEnvBool('ORDER_ALLOW_GUEST_CHECKOUT', false),
  defaultCurrency: 'BDT',
  maxOrderAgeDays: getOptionalEnvInt('ORDER_MAX_AGE_DAYS', 365),
} as const);
