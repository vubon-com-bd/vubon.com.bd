/**
 * MFA_CONFIG — MFA/TOTP configuration
 * @module auth-service/infrastructure/config
 */
import { getOptionalEnv, getOptionalEnvInt } from '@vubon/shared-config/common';
import { AUTH_MFA } from '@vubon/shared-constants/auth';

export const MFA_CONFIG = Object.freeze({
  enabledByDefault: getOptionalEnv('MFA_ENABLED_DEFAULT', String(AUTH_MFA.ENABLED_DEFAULT)) === 'true',
  issuer: getOptionalEnv('MFA_ISSUER', 'Vubon') as string,
  totpWindow: getOptionalEnvInt('MFA_TOTP_WINDOW', AUTH_MFA.TOTP_WINDOW),
  totpPeriodSeconds: getOptionalEnvInt('MFA_TOTP_PERIOD', AUTH_MFA.TOTP_PERIOD_SECONDS),
  totpDigits: getOptionalEnvInt('MFA_TOTP_DIGITS', AUTH_MFA.TOTP_DIGITS),
  backupCodeCount: getOptionalEnvInt('MFA_BACKUP_CODE_COUNT', AUTH_MFA.BACKUP_CODES_COUNT),
  otpExpirySeconds: getOptionalEnvInt('MFA_OTP_EXPIRY', AUTH_MFA.OTP_EXPIRY_SECONDS),
  maxAttempts: getOptionalEnvInt('MFA_MAX_ATTEMPTS', AUTH_MFA.MAX_ATTEMPTS),
} as const);
