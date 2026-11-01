/**
 * Auth Service Configuration
 * @module identity-service/infrastructure/config
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const AUTH_SERVICE_CONFIG = Object.freeze({
  serviceName: getOptionalEnv('AUTH_SERVICE_NAME', 'auth-service'),
  servicePort: getOptionalEnvInt('AUTH_SERVICE_PORT', 3001),
  registrationEnabled: getOptionalEnvBool('AUTH_REGISTRATION_ENABLED', true),
  emailVerificationRequired: getOptionalEnvBool('AUTH_EMAIL_VERIFICATION_REQUIRED', true),
  phoneVerificationRequired: getOptionalEnvBool('AUTH_PHONE_VERIFICATION_REQUIRED', false),
  mfaRequired: getOptionalEnvBool('AUTH_MFA_REQUIRED', false),
  concurrentLoginAllowed: getOptionalEnvBool('AUTH_CONCURRENT_LOGIN_ALLOWED', true),
  maxIdentifiersPerUser: getOptionalEnvInt('AUTH_MAX_IDENTIFIERS', 5),
});
