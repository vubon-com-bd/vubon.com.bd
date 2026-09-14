/**
 * Image processing configuration
 * @module shared-config/media/image
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const IMAGE_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('IMAGE_ENABLED', true),
  provider: getOptionalEnv('IMAGE_PROVIDER', 'sharp'), // sharp | imagemin | cloudinary | imgix
  maxWidth: getOptionalEnvInt('IMAGE_MAX_WIDTH', 5000),
  maxHeight: getOptionalEnvInt('IMAGE_MAX_HEIGHT', 5000),
  maxFileSizeMb: getOptionalEnvInt('IMAGE_MAX_FILE_SIZE_MB', 10),
  thumbnailWidth: getOptionalEnvInt('IMAGE_THUMBNAIL_WIDTH', 300),
  thumbnailHeight: getOptionalEnvInt('IMAGE_THUMBNAIL_HEIGHT', 300),
  quality: getOptionalEnvInt('IMAGE_QUALITY', 85),
  format: getOptionalEnv('IMAGE_FORMAT', 'webp'), // webp | jpeg | png | avif
  generateThumbnail: getOptionalEnvBool('IMAGE_GENERATE_THUMBNAIL', true),
  stripMetadata: getOptionalEnvBool('IMAGE_STRIP_METADATA', true),
  watermarkEnabled: getOptionalEnvBool('IMAGE_WATERMARK', false),
  cdnEnabled: getOptionalEnvBool('IMAGE_CDN', false),
});
