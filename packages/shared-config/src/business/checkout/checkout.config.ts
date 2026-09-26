/**
 * Checkout configuration
 * @module shared-config/business/checkout
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const CHECKOUT_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('CHECKOUT_ENABLED', true),
  allowGuestCheckout: getOptionalEnvBool('CHECKOUT_ALLOW_GUEST', true),
  requirePhone: getOptionalEnvBool('CHECKOUT_REQUIRE_PHONE', true),
  requireEmail: getOptionalEnvBool('CHECKOUT_REQUIRE_EMAIL', true),
  requireShippingAddress: getOptionalEnvBool('CHECKOUT_REQUIRE_SHIPPING', true),
  requireBillingAddress: getOptionalEnvBool('CHECKOUT_REQUIRE_BILLING', false),
  minOrderAmount: getOptionalEnvInt('CHECKOUT_MIN_ORDER_AMOUNT', 1),
  maxOrderAmount: getOptionalEnvInt('CHECKOUT_MAX_ORDER_AMOUNT', 10000000),
  reserveStockMinutes: getOptionalEnvInt('CHECKOUT_RESERVE_STOCK_MIN', 15),
  sessionTtlSeconds: getOptionalEnvInt('CHECKOUT_SESSION_TTL_SECONDS', 3600),
  allowShippingBillingDiff: getOptionalEnvBool('CHECKOUT_SHIP_BILL_DIFF', true),
  expressCheckoutEnabled: getOptionalEnvBool('CHECKOUT_EXPRESS', true),
});
