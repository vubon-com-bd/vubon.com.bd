import { getOptionalEnv, getOptionalEnvInt } from './_helpers.js';

function parseStorageProvider(): 's3' | 'local' | 'gcs' {
  const raw = getOptionalEnv('STORAGE_PROVIDER', 'local') as string;
  return raw === 's3' || raw === 'gcs' || raw === 'local' ? raw : 'local';
}

const MEDIA_CONFIG = Object.freeze({
  MAX_IMAGE_SIZE_MB: 5,
  MAX_VIDEO_SIZE_MB: 100,
  MAX_DOCUMENT_SIZE_MB: 10,
  IMAGE_QUALITY: getOptionalEnvInt('MEDIA_IMAGE_QUALITY', 85),
  IMAGE_MAX_WIDTH: getOptionalEnvInt('MEDIA_IMAGE_MAX_WIDTH', 2048),
  THUMBNAIL_WIDTH: getOptionalEnvInt('MEDIA_THUMBNAIL_WIDTH', 400),
  STORAGE_PROVIDER: parseStorageProvider(),
} as const);

export type MediaConfig = typeof MEDIA_CONFIG;
export const mediaConfig = MEDIA_CONFIG;
export function getMediaConfig(): MediaConfig { return MEDIA_CONFIG; }
