/**
 * Avatar Config
 */
import { USER_PROFILE } from '@vubon/shared-constants/user';
import { getOptionalEnvInt } from '@vubon/shared-config/common/env';

export const AVATAR_CONFIG = Object.freeze({
  maxSizeMB: USER_PROFILE.AVATAR_MAX_SIZE_MB,
  allowedMimes: [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
  ] as const,
  maxWidthPx: getOptionalEnvInt('AVATAR_MAX_WIDTH', 1024),
  maxHeightPx: getOptionalEnvInt('AVATAR_MAX_HEIGHT', 1024),
} as const);

export type AvatarConfig = typeof AVATAR_CONFIG;
