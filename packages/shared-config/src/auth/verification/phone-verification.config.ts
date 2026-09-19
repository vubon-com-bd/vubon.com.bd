/**
 * Phone verification configuration
 * @module shared-config/auth/verification
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const PHONE_VERIFICATION_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('PHONE_VERIFICATION_ENABLED', true),
  required: getOptionalEnvBool('PHONE_VERIFICATION_REQUIRED', false),
  tokenExpirySeconds: getOptionalEnvInt('PHONE_VERIFY_TOKEN_TTL', 600),
  maxAttempts: getOptionalEnvInt('PHONE_VERIFY_MAX_ATTEMPTS', 5),
  resendCooldownSeconds: getOptionalEnvInt('PHONE_VERIFY_RESEND_COOLDOWN', 60),
  autoLoginAfterVerify: getOptionalEnvBool('PHONE_VERIFY_AUTO_LOGIN', false),
  verifyBeforeOrder: getOptionalEnvBool('PHONE_VERIFY_BEFORE_ORDER', false),
});
