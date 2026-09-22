import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const MEDIA_CONFIG = Object.freeze({
  maxPerProduct: getOptionalEnvInt('MEDIA_MAX_PER_PRODUCT', 20),
  maxImageSizeMb: getOptionalEnvInt('MEDIA_MAX_IMAGE_SIZE_MB', 5),
  maxVideoSizeMb: getOptionalEnvInt('MEDIA_MAX_VIDEO_SIZE_MB', 50),
  allowedImageFormats: Object.freeze(['jpg', 'jpeg', 'png', 'webp'] as const),
  allowedVideoFormats: Object.freeze(['mp4', 'webm'] as const),
  autoOptimize: true,
} as const);
