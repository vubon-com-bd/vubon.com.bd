/**
 * Nagad Infra Configuration
 * @module payment-service/infrastructure/config
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const NAGAD_INFRA_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('NAGAD_ENABLED', false),
  merchantId: getOptionalEnv('NAGAD_MERCHANT_ID', ''),
  merchantPrivateKey: getOptionalEnv('NAGAD_MERCHANT_PRIVATE_KEY', ''),
  pgPublicKey: getOptionalEnv('NAGAD_PG_PUBLIC_KEY', ''),
  baseUrl: getOptionalEnv('NAGAD_BASE_URL', 'http://sandbox.mynagad.com:10080'),
  callbackUrl: getOptionalEnv('NAGAD_CALLBACK_URL', ''),
  timeoutMs: getOptionalEnvInt('NAGAD_TIMEOUT_MS', 30_000),
});

export type NagadInfraConfig = typeof NAGAD_INFRA_CONFIG;
