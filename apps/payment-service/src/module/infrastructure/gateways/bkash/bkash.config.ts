/**
 * bKash Gateway Config (per-service override)
 * @module payment-service/infrastructure/gateways/bkash
 *
 * Reads from shared-config's BKASH_CONFIG but adds service-scoped overrides.
 */
import { BKASH_CONFIG } from '@vubon/shared-config/business';
import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const PAYMENT_BKASH_CONFIG = Object.freeze({
  enabled: BKASH_CONFIG.enabled,
  appKey: BKASH_CONFIG.appKey,
  appSecret: BKASH_CONFIG.appSecret,
  username: BKASH_CONFIG.username,
  password: BKASH_CONFIG.password,
  baseUrl: BKASH_CONFIG.baseUrl,
  callbackUrl: BKASH_CONFIG.callbackUrl,
  timeoutMs: getOptionalEnvInt(
    'PAYMENT_BKASH_TIMEOUT_MS',
    BKASH_CONFIG.timeoutMs,
  ),
  tokenCacheTtlSeconds: getOptionalEnvInt(
    'PAYMENT_BKASH_TOKEN_TTL_SECONDS',
    3300,
  ),
  merchantShortCode: getOptionalEnv('PAYMENT_BKASH_MERCHANT', ''),
  intent: getOptionalEnv('PAYMENT_BKASH_INTENT', 'sale'),
});
