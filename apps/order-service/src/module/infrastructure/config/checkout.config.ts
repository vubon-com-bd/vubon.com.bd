/**
 * Checkout Configuration
 * @module order-service/infrastructure/config
 */
import {
  getOptionalEnvBool,
  getOptionalEnvInt,
} from '@vubon/shared-config/common';

export const CHECKOUT_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('ORDER_SERVICE_CHECKOUT_ENABLED', true),
  sessionTtlMinutes: getOptionalEnvInt('ORDER_SERVICE_CHECKOUT_TTL_MIN', 30),
  autoAbandonMinutes: getOptionalEnvInt('ORDER_SERVICE_CHECKOUT_AUTO_ABANDON_MIN', 60),
  requirePaymentMethod: getOptionalEnvBool('ORDER_SERVICE_CHECKOUT_REQUIRE_PAYMENT', true),
  requireShippingMethod: getOptionalEnvBool('ORDER_SERVICE_CHECKOUT_REQUIRE_SHIPPING', true),
  maxSessionsPerCustomer: getOptionalEnvInt('ORDER_SERVICE_CHECKOUT_MAX_SESSIONS', 5),
});

export type CheckoutConfig = typeof CHECKOUT_CONFIG;
