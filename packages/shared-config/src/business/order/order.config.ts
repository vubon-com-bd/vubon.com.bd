/**
 * Order configuration
 * @module shared-config/business/order
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const ORDER_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('ORDER_ENABLED', true),
  autoConfirm: getOptionalEnvBool('ORDER_AUTO_CONFIRM', false),
  autoCancelUnpaidHours: getOptionalEnvInt('ORDER_AUTO_CANCEL_UNPAID_HOURS', 24),
  requirePaymentBeforeConfirm: getOptionalEnvBool('ORDER_PAYMENT_BEFORE_CONFIRM', true),
  minAmount: getOptionalEnvInt('ORDER_MIN_AMOUNT', 1),
  maxAmount: getOptionalEnvInt('ORDER_MAX_AMOUNT', 10000000),
  maxItems: getOptionalEnvInt('ORDER_MAX_ITEMS', 100),
  confirmationWindowHours: getOptionalEnvInt('ORDER_CONFIRM_WINDOW_HOURS', 24),
  allowPartialFulfillment: getOptionalEnvBool('ORDER_PARTIAL_FULFILL', true),
  allowGuestOrder: getOptionalEnvBool('ORDER_ALLOW_GUEST', true),
});
