/**
 * aamarPay Gateway Config
 * @module payment-service/infrastructure/gateways/aamarpay
 */
import { AAMARPAY_CONFIG } from '@vubon/shared-config/business';
import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';

export const PAYMENT_AAMARPAY_CONFIG = Object.freeze({
  enabled: AAMARPAY_CONFIG.enabled,
  storeId: AAMARPAY_CONFIG.storeId,
  signatureKey: AAMARPAY_CONFIG.signatureKey,
  baseUrl: AAMARPAY_CONFIG.baseUrl,
  successUrl: AAMARPAY_CONFIG.successUrl,
  failUrl: AAMARPAY_CONFIG.failUrl,
  cancelUrl: AAMARPAY_CONFIG.cancelUrl,
  ipnUrl: getOptionalEnv('PAYMENT_AAMARPAY_IPN_URL', ''),
  timeoutMs: getOptionalEnvInt(
    'PAYMENT_AAMARPAY_TIMEOUT_MS',
    AAMARPAY_CONFIG.timeoutMs,
  ),
});
