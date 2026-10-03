/**
 * TWO_FA_CONFIG — 2FA policy configuration
 * @module auth-service/infrastructure/config
 */
import { getOptionalEnv, getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';
import { AUTH_MFA } from '@vubon/shared-constants/auth';

export const TWO_FA_CONFIG = Object.freeze({
  defaultMethod: getOptionalEnv('2FA_DEFAULT_METHOD', 'totp') as string,
  requiredForAdmin: getOptionalEnvBool('2FA_REQUIRED_ADMIN', true),
  requiredForVendor: getOptionalEnvBool('2FA_REQUIRED_VENDOR', false),
  backupCodeCount: getOptionalEnvInt('2FA_BACKUP_COUNT', AUTH_MFA.BACKUP_CODES_COUNT),
  challengeExpirySeconds: getOptionalEnvInt('2FA_CHALLENGE_EXPIRY', AUTH_MFA.OTP_EXPIRY_SECONDS),
  allowRememberDevice: getOptionalEnvBool('2FA_REMEMBER_DEVICE', true),
  rememberDeviceTtlDays: getOptionalEnvInt('2FA_REMEMBER_DEVICE_TTL_DAYS', 30),
} as const);
