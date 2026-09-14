/**
 * Generic verification token configuration
 * @module shared-config/auth/verification
 *
 * Values আসে shared-constants/security থেকে।
 */
import { VERIFICATION_TOKEN } from '@vubon/shared-constants/security';
import { getOptionalEnvBool } from '../../common/env/env.helper';

export const VERIFICATION_TOKEN_CONFIG = Object.freeze({
  length: VERIFICATION_TOKEN.LENGTH,
  defaultExpirySeconds: VERIFICATION_TOKEN.EXPIRY_SECONDS,
  emailExpirySeconds: VERIFICATION_TOKEN.EMAIL_EXPIRY_SECONDS,
  phoneExpirySeconds: VERIFICATION_TOKEN.PHONE_EXPIRY_SECONDS,
  hash: getOptionalEnvBool('VERIFY_TOKEN_HASH', true),
  singleUse: getOptionalEnvBool('VERIFY_TOKEN_SINGLE_USE', true),
});
