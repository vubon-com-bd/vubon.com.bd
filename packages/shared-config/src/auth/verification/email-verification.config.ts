/**
 * Email verification configuration
 * @module shared-config/auth/verification
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const EMAIL_VERIFICATION_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('EMAIL_VERIFICATION_ENABLED', true),
  required: getOptionalEnvBool('EMAIL_VERIFICATION_REQUIRED', true),
  tokenExpirySeconds: getOptionalEnvInt('EMAIL_VERIFY_TOKEN_TTL', 86400),
  maxAttempts: getOptionalEnvInt('EMAIL_VERIFY_MAX_ATTEMPTS', 5),
  resendCooldownSeconds: getOptionalEnvInt('EMAIL_VERIFY_RESEND_COOLDOWN', 60),
  autoLoginAfterVerify: getOptionalEnvBool('EMAIL_VERIFY_AUTO_LOGIN', false),
  verifyBeforeLogin: getOptionalEnvBool('EMAIL_VERIFY_BEFORE_LOGIN', false),
  verifyBeforeOrder: getOptionalEnvBool('EMAIL_VERIFY_BEFORE_ORDER', false),
});
