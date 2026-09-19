import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';
import { AUTH_MFA } from '@vubon/shared-constants/auth';

export const MFA_CONFIG = Object.freeze({
  otpLength: getOptionalEnvInt('MFA_OTP_LENGTH', AUTH_MFA.OTP_LENGTH),
  otpExpirySeconds: getOptionalEnvInt('MFA_OTP_EXPIRY', AUTH_MFA.OTP_EXPIRY_SECONDS),
  maxAttempts: getOptionalEnvInt('MFA_MAX_ATTEMPTS', AUTH_MFA.MAX_ATTEMPTS),
  backupCodesCount: getOptionalEnvInt('MFA_BACKUP_CODES_COUNT', AUTH_MFA.BACKUP_CODES_COUNT),
  backupCodeLength: getOptionalEnvInt('MFA_BACKUP_CODE_LENGTH', AUTH_MFA.BACKUP_CODE_LENGTH),
  totpWindow: getOptionalEnvInt('MFA_TOTP_WINDOW', AUTH_MFA.TOTP_WINDOW),
  totpPeriodSeconds: getOptionalEnvInt('MFA_TOTP_PERIOD', AUTH_MFA.TOTP_PERIOD_SECONDS),
  totpDigits: getOptionalEnvInt('MFA_TOTP_DIGITS', AUTH_MFA.TOTP_DIGITS),
  totpAlgorithm: getOptionalEnv('MFA_TOTP_ALGORITHM', AUTH_MFA.TOTP_ALGORITHM),
} as const);
