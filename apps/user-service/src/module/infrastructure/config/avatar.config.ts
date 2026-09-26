import { getOptionalEnvBool, getOptionalEnvInt } from '@vubon/shared-config/common';

export const AVATAR_CONFIG = Object.freeze({
  maxSizeMb: getOptionalEnvInt('AVATAR_MAX_SIZE_MB', 5),
  allowedFormats: Object.freeze(['jpg', 'jpeg', 'png', 'webp'] as const),
  dimensions: Object.freeze({
    width: 512,
    height: 512,
  }),
  enableProcessing: getOptionalEnvBool('AVATAR_ENABLE_PROCESSING', true),
} as const);
