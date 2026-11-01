/**
 * Media Infrastructure Configuration
 * @module product-service/infrastructure/config
 */
import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const MEDIA_INFRA_CONFIG = Object.freeze({
  imageMaxSizeMb: getOptionalEnvInt('MEDIA_IMAGE_MAX_SIZE_MB', 5),
  videoMaxSizeMb: getOptionalEnvInt('MEDIA_VIDEO_MAX_SIZE_MB', 50),
  thumbnailWidth: getOptionalEnvInt('MEDIA_THUMBNAIL_WIDTH', 400),
  thumbnailHeight: getOptionalEnvInt('MEDIA_THUMBNAIL_HEIGHT', 400),
  processingConcurrency: getOptionalEnvInt('MEDIA_PROCESSING_CONCURRENCY', 2),
  storagePrefix: 'products/media',
} as const);

export type MediaInfraConfig = typeof MEDIA_INFRA_CONFIG;
