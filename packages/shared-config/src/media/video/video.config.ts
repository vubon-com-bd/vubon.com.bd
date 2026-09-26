/**
 * Video processing configuration
 * @module shared-config/media/video
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const VIDEO_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('VIDEO_ENABLED', true),
  provider: getOptionalEnv('VIDEO_PROVIDER', 'ffmpeg'),
  maxFileSizeMb: getOptionalEnvInt('VIDEO_MAX_FILE_SIZE_MB', 500),
  maxDurationSeconds: getOptionalEnvInt('VIDEO_MAX_DURATION_SECONDS', 600),
  maxWidth: getOptionalEnvInt('VIDEO_MAX_WIDTH', 1920),
  maxHeight: getOptionalEnvInt('VIDEO_MAX_HEIGHT', 1080),
  generateThumbnail: getOptionalEnvBool('VIDEO_GENERATE_THUMBNAIL', true),
  thumbnailAtSecond: getOptionalEnvInt('VIDEO_THUMBNAIL_AT_SEC', 2),
  transcodingEnabled: getOptionalEnvBool('VIDEO_TRANSCODING', false),
  hlsEnabled: getOptionalEnvBool('VIDEO_HLS_ENABLED', false),
  cdnEnabled: getOptionalEnvBool('VIDEO_CDN', false),
});
