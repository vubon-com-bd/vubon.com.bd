/**
 * MFA Configuration
 * @module identity-service/infrastructure/config
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';
import { AUTH_MFA } from '@vubon/shared-constants/auth';

export const AUTH_MFA_CONFIG = Object.freeze({
  enabledByDefault: getOptionalEnvBool('MFA_ENABLED_DEFAULT', AUTH_MFA.ENABLED_DEFAULT),
  otpLength: getOptionalEnvInt('MFA_OTP_LENGTH', AUTH_MFA.OTP_LENGTH),
  otpExpirySeconds: getOptionalEnvInt('MFA_OTP_EXPIRY', AUTH_MFA.OTP_EXPIRY_SECONDS),
  maxAttempts: getOptionalEnvInt('MFA_MAX_ATTEMPTS', AUTH_MFA.MAX_ATTEMPTS),
  backupCodesCount: getOptionalEnvInt('MFA_BACKUP_CODES', AUTH_MFA.BACKUP_CODES_COUNT),
  backupCodeLength: getOptionalEnvInt('MFA_BACKUP_CODE_LEN', AUTH_MFA.BACKUP_CODE_LENGTH),
  totpPeriodSeconds: getOptionalEnvInt('MFA_TOTP_PERIOD', AUTH_MFA.TOTP_PERIOD_SECONDS),
  totpDigits: getOptionalEnvInt('MFA_TOTP_DIGITS', AUTH_MFA.TOTP_DIGITS),
});
