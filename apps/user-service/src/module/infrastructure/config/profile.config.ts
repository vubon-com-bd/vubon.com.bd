import { getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const PROFILE_CONFIG = Object.freeze({
  bioMaxLength: getOptionalEnvInt('PROFILE_BIO_MAX_LENGTH', 500),
  avatarMaxSizeMb: getOptionalEnvInt('PROFILE_AVATAR_MAX_SIZE_MB', 5),
  defaultVisibility: 'public',
  allowPublicProfiles: getOptionalEnvBool('PROFILE_ALLOW_PUBLIC', true),
} as const);
