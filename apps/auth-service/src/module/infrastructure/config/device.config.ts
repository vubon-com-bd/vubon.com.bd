/**
 * DEVICE_CONFIG — Device trust configuration
 * @module auth-service/infrastructure/config
 */
import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';

export const DEVICE_CONFIG = Object.freeze({
  trustPromotionThreshold: getOptionalEnvInt('DEVICE_TRUST_THRESHOLD', 3),
  maxDevicesPerUser: getOptionalEnvInt('DEVICE_MAX_PER_USER', 10),
  autoTrustEnabled: getOptionalEnvBool('DEVICE_AUTO_TRUST', true),
  requireTrustForAdmin: getOptionalEnvBool('DEVICE_REQUIRE_TRUST_ADMIN', true),
  fingerprintTtlDays: getOptionalEnvInt('DEVICE_FINGERPRINT_TTL_DAYS', 365),
} as const);
