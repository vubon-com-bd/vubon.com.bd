/**
 * USER_CONFIG — User-related limits & policies
 * @module auth-service/infrastructure/config
 */
import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';
import { VALIDATION } from '@vubon/shared-constants/common';

export const USER_CONFIG = Object.freeze({
  nameMinLength: getOptionalEnvInt('USER_NAME_MIN_LENGTH', VALIDATION.NAME_MIN_LENGTH),
  nameMaxLength: getOptionalEnvInt('USER_NAME_MAX_LENGTH', VALIDATION.NAME_MAX_LENGTH),
  usernameMinLength: getOptionalEnvInt('USER_USERNAME_MIN_LENGTH', VALIDATION.USERNAME_MIN_LENGTH),
  usernameMaxLength: getOptionalEnvInt('USER_USERNAME_MAX_LENGTH', VALIDATION.USERNAME_MAX_LENGTH),
  maxAddressesPerUser: getOptionalEnvInt('USER_MAX_ADDRESSES', 10),
  maxContactsPerUser: getOptionalEnvInt('USER_MAX_CONTACTS', 5),
  requireUniquePhone: getOptionalEnvBool('USER_REQUIRE_UNIQUE_PHONE', true),
  softDeleteEnabled: getOptionalEnvBool('USER_SOFT_DELETE', true),
} as const);
