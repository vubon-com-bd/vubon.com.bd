/**
 * MFA base configuration
 * @module shared-config/auth/mfa
 *
 * Values আসে shared-constants/auth থেকে।
 */
import { AUTH_MFA } from '@vubon/shared-constants/auth';
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const MFA_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('MFA_ENABLED', true),
  enabledByDefault: AUTH_MFA.ENABLED_DEFAULT,
  otpLength: AUTH_MFA.OTP_LENGTH,
  otpExpirySeconds: AUTH_MFA.OTP_EXPIRY_SECONDS,
  maxAttempts: AUTH_MFA.MAX_ATTEMPTS,
  primaryMethod: 'totp',
  backupMethods: Object.freeze(['backup_code', 'sms'] as const),
  requireMfaForAdmin: getOptionalEnvBool('MFA_REQUIRE_FOR_ADMIN', true),
  requireMfaForVendor: getOptionalEnvBool('MFA_REQUIRE_FOR_VENDOR', false),
  challengeTtlSeconds: getOptionalEnvInt('MFA_CHALLENGE_TTL_SECONDS', 300),
  rememberDeviceDays: getOptionalEnvInt('MFA_REMEMBER_DEVICE_DAYS', 30),
});
