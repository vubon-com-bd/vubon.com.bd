import { getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const BIOMETRIC_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('BIOMETRIC_ENABLED', true),
  maxEnrollmentsPerUser: getOptionalEnvInt('BIOMETRIC_MAX_PER_USER', 3),
  challengeTtlSeconds: getOptionalEnvInt('BIOMETRIC_CHALLENGE_TTL', 120),
  allowedTypes: Object.freeze([
    'fingerprint',
    'face',
    'voice',
    'iris',
  ] as const),
} as const);
