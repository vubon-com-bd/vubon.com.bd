/**
 * Rocket (DBBL) Gateway Config
 * @module payment-service/infrastructure/gateways/rocket
 */
import { ROCKET_CONFIG } from '@vubon/shared-config/business';
import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const PAYMENT_ROCKET_CONFIG = Object.freeze({
  enabled: ROCKET_CONFIG.enabled,
  merchantId: ROCKET_CONFIG.merchantId,
  apiKey: ROCKET_CONFIG.apiKey,
  baseUrl: ROCKET_CONFIG.baseUrl,
  callbackUrl: ROCKET_CONFIG.callbackUrl,
  timeoutMs: getOptionalEnvInt('PAYMENT_ROCKET_TIMEOUT_MS', ROCKET_CONFIG.timeoutMs),
  returnUrl: getOptionalEnv('PAYMENT_ROCKET_RETURN_URL', ''),
  cancelUrl: getOptionalEnv('PAYMENT_ROCKET_CANCEL_URL', ''),
});
