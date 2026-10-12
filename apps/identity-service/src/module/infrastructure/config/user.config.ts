/**
 * User (auth-service) Configuration
 * @module identity-service/infrastructure/config
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const AUTH_USER_CONFIG = Object.freeze({
  maxProfilesPerUser: getOptionalEnvInt('USER_MAX_PROFILES', 1),
  maxAddressesPerUser: getOptionalEnvInt('USER_MAX_ADDRESSES', 10),
  maxContactsPerUser: getOptionalEnvInt('USER_MAX_CONTACTS', 10),
  requireEmailVerificationOnRegister: getOptionalEnvBool(
    'USER_REQUIRE_EMAIL_VERIFY',
    true,
  ),
  autoActivateOnVerify: getOptionalEnvBool('USER_AUTO_ACTIVATE', true),
  softDeleteGraceDays: getOptionalEnvInt('USER_SOFT_DELETE_GRACE_DAYS', 30),
});
