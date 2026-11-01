/**
 * Rocket Infra Configuration
 * @module payment-service/infrastructure/config
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const ROCKET_INFRA_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('ROCKET_ENABLED', false),
  merchantId: getOptionalEnv('ROCKET_MERCHANT_ID', ''),
  apiKey: getOptionalEnv('ROCKET_API_KEY', ''),
  baseUrl: getOptionalEnv('ROCKET_BASE_URL', ''),
  callbackUrl: getOptionalEnv('ROCKET_CALLBACK_URL', ''),
  timeoutMs: getOptionalEnvInt('ROCKET_TIMEOUT_MS', 30_000),
});

export type RocketInfraConfig = typeof ROCKET_INFRA_CONFIG;
