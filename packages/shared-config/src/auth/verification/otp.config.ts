/**
 * OTP configuration
 * @module shared-config/auth/verification
 *
 * Values আসে shared-constants/security থেকে।
 */
import { OTP } from '@vubon/shared-constants/security';
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const OTP_CONFIG = Object.freeze({
  length: OTP.LENGTH,
  expirySeconds: OTP.EXPIRY_SECONDS,
  maxAttempts: OTP.MAX_ATTEMPTS,
  resendCooldownSeconds: OTP.RESEND_COOLDOWN_SECONDS,
  maxResend: OTP.MAX_RESEND,
  numericOnly: true,
  hash: getOptionalEnvBool('OTP_HASH', true),
  singleUse: getOptionalEnvBool('OTP_SINGLE_USE', true),
  cleanupIntervalSeconds: getOptionalEnvInt('OTP_CLEANUP_INTERVAL_SECONDS', 300),
});
