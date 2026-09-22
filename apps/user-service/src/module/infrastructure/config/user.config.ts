import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const USER_CONFIG = Object.freeze({
  defaultRole: getOptionalEnv('USER_DEFAULT_ROLE', 'user'),
  defaultStatus: getOptionalEnv('USER_DEFAULT_STATUS', 'active'),
  defaultType: getOptionalEnv('USER_DEFAULT_TYPE', 'customer'),
  requireEmailVerification: getOptionalEnvBool('USER_REQUIRE_EMAIL_VERIFY', true),
  requirePhoneVerification: getOptionalEnvBool('USER_REQUIRE_PHONE_VERIFY', false),
  maxUsersPerPage: getOptionalEnvInt('USER_MAX_PER_PAGE', 100),
} as const);
