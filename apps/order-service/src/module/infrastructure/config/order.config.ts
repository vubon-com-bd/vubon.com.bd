/**
 * Order Configuration
 * @module order-service/infrastructure/config
 */
import {
  getOptionalEnv,
  getOptionalEnvBool,
  getOptionalEnvInt,
} from '@vubon/shared-config/common';

export const ORDER_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('ORDER_SERVICE_ORDER_ENABLED', true),
  autoConfirm: getOptionalEnvBool('ORDER_SERVICE_AUTO_CONFIRM', false),
  autoCancelHours: getOptionalEnvInt('ORDER_SERVICE_AUTO_CANCEL_HOURS', 48),
  confirmationWindowHours: getOptionalEnvInt('ORDER_SERVICE_CONFIRMATION_WINDOW_HOURS', 24),
  paymentWindowMinutes: getOptionalEnvInt('ORDER_SERVICE_PAYMENT_WINDOW_MINUTES', 30),
  maxItemsPerOrder: getOptionalEnvInt('ORDER_SERVICE_MAX_ITEMS', 100),
  maxAmount: getOptionalEnvInt('ORDER_SERVICE_MAX_AMOUNT', 10_000_000),
  minAmount: getOptionalEnvInt('ORDER_SERVICE_MIN_AMOUNT', 1),
  defaultCurrency: getOptionalEnv('ORDER_SERVICE_DEFAULT_CURRENCY', 'BDT'),
  defaultPriority: getOptionalEnv('ORDER_SERVICE_DEFAULT_PRIORITY', 'normal'),
  allowGuestOrder: getOptionalEnvBool('ORDER_SERVICE_ALLOW_GUEST_ORDER', true),
});

export type OrderConfig = typeof ORDER_CONFIG;
