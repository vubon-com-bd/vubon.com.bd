/**
 * BIOMETRIC_CONFIG — Biometric auth configuration
 * @module auth-service/infrastructure/config
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const BIOMETRIC_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('BIOMETRIC_ENABLED', true),
  allowedKinds: ['fingerprint', 'face', 'voice', 'iris'],
  maxEnrollmentsPerUser: getOptionalEnvInt('BIOMETRIC_MAX_ENROLLMENTS', 3),
  requirePasswordForEnrollment: getOptionalEnvBool('BIOMETRIC_REQUIRE_PASSWORD', true),
  deviceBindRequired: getOptionalEnvBool('BIOMETRIC_DEVICE_BIND', true),
} as const);
