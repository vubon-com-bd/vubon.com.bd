/**
 * Biometric Configuration
 * @module identity-service/infrastructure/config
 */
import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const AUTH_BIOMETRIC_CONFIG = Object.freeze({
  challengeLength: getOptionalEnvInt('BIOMETRIC_CHALLENGE_LENGTH', 32),
  challengeTtlSeconds: getOptionalEnvInt('BIOMETRIC_CHALLENGE_TTL', 120),
  maxAttempts: getOptionalEnvInt('BIOMETRIC_MAX_ATTEMPTS', 5),
  minPublicKeyHashLength: getOptionalEnvInt('BIOMETRIC_MIN_KEY_LEN', 32),
});
