/**
 * TOTP (Time-based One-Time Password) configuration
 * @module shared-config/auth/mfa
 *
 * Values আসে shared-constants/auth থেকে।
 */
import { AUTH_MFA } from '@vubon/shared-constants/auth';
import { getOptionalEnv, getOptionalEnvInt } from '../../common/env/env.helper';

export const TOTP_CONFIG = Object.freeze({
  periodSeconds: AUTH_MFA.TOTP_PERIOD_SECONDS,
  digits: AUTH_MFA.TOTP_DIGITS,
  algorithm: AUTH_MFA.TOTP_ALGORITHM, // SHA1 | SHA256 | SHA512
  window: AUTH_MFA.TOTP_WINDOW, // ±1 step tolerance
  secretBytes: getOptionalEnvInt('TOTP_SECRET_BYTES', 20),
  issuer: getOptionalEnv('TOTP_ISSUER', 'Vubon'),
  label: getOptionalEnv('TOTP_LABEL', 'Vubon Account'),
});
