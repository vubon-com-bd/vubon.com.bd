import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const USER_CONFIG = Object.freeze({
  defaultRole: getOptionalEnv('USER_DEFAULT_ROLE', 'USER'),
  defaultStatus: getOptionalEnv('USER_DEFAULT_STATUS', 'ACTIVE'),
  defaultType: getOptionalEnv('USER_DEFAULT_TYPE', 'CUSTOMER'),
  maxAddressesPerUser: getOptionalEnvInt('USER_MAX_ADDRESSES', 10),
  requireEmailVerification: getOptionalEnvBool('USER_REQUIRE_EMAIL_VERIFY', true),
  requirePhoneVerification: getOptionalEnvBool('USER_REQUIRE_PHONE_VERIFY', false),
} as const);
