/**
 * User Config
 * @module user-service/infrastructure/config
 */
import {
  getOptionalEnv,
  getOptionalEnvInt,
} from '@vubon/shared-config/common/env';

export const USER_CONFIG = Object.freeze({
  maxProfiles: getOptionalEnvInt('USER_MAX_PROFILES', 5),
  maxAddresses: getOptionalEnvInt('USER_MAX_ADDRESSES', 20),
  maxContacts: getOptionalEnvInt('USER_MAX_CONTACTS', 10),
  profileCompletionThreshold: getOptionalEnvInt('USER_PROFILE_COMPLETION_THRESHOLD', 80),
  defaultTimezone: getOptionalEnv('USER_DEFAULT_TIMEZONE', 'Asia/Dhaka'),
  defaultLanguage: getOptionalEnv('USER_DEFAULT_LANGUAGE', 'bn'),
  defaultLocale: getOptionalEnv('USER_DEFAULT_LOCALE', 'bn-BD'),
} as const);

export type UserConfig = typeof USER_CONFIG;
