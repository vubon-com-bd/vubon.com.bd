/**
 * Nagad Gateway Config (per-service override)
 * @module payment-service/infrastructure/gateways/nagad
 */
import { NAGAD_CONFIG } from '@vubon/shared-config/business';
import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const PAYMENT_NAGAD_CONFIG = Object.freeze({
  enabled: NAGAD_CONFIG.enabled,
  merchantId: NAGAD_CONFIG.merchantId,
  merchantPrivateKey: NAGAD_CONFIG.merchantPrivateKey,
  pgPublicKey: NAGAD_CONFIG.pgPublicKey,
  baseUrl: NAGAD_CONFIG.baseUrl,
  callbackUrl: NAGAD_CONFIG.callbackUrl,
  timeoutMs: getOptionalEnvInt('PAYMENT_NAGAD_TIMEOUT_MS', NAGAD_CONFIG.timeoutMs),
  merchantNumber: getOptionalEnv('PAYMENT_NAGAD_MERCHANT_NUMBER', ''),
  callbackUrlAlt: getOptionalEnv('PAYMENT_NAGAD_CALLBACK_URL_ALT', ''),
});
