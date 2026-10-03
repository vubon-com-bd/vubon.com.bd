/**
 * Profile Config
 */
import { getOptionalEnvInt } from '@vubon/shared-config/common/env';
import { USER_PROFILE } from '@vubon/shared-constants/user';

export const PROFILE_CONFIG = Object.freeze({
  bioMaxLength: USER_PROFILE.BIO_MAX_LENGTH,
  nameMaxLength: USER_PROFILE.NAME_MAX_LENGTH,
  websiteMaxLength: USER_PROFILE.WEBSITE_MAX_LENGTH,
  completionCacheTtl: getOptionalEnvInt('PROFILE_COMPLETION_CACHE_TTL', 300),
} as const);

export type ProfileConfig = typeof PROFILE_CONFIG;
