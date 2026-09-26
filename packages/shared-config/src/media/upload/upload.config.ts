/**
 * Upload configuration
 * @module shared-config/media/upload
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const UPLOAD_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('UPLOAD_ENABLED', true),
  strategy: getOptionalEnv('UPLOAD_STRATEGY', 'multipart'), // multipart | chunked | presigned
  chunkSizeMb: getOptionalEnvInt('UPLOAD_CHUNK_SIZE_MB', 5),
  maxConcurrentUploads: getOptionalEnvInt('UPLOAD_MAX_CONCURRENT', 3),
  maxFileSizeMb: getOptionalEnvInt('UPLOAD_MAX_FILE_MB', 100),
  maxTotalSizeMb: getOptionalEnvInt('UPLOAD_MAX_TOTAL_MB', 500),
  timeoutMs: getOptionalEnvInt('UPLOAD_TIMEOUT_MS', 300000),
  retryAttempts: getOptionalEnvInt('UPLOAD_RETRY_ATTEMPTS', 3),
  usePresignedUrls: getOptionalEnvBool('UPLOAD_PRESIGNED_URLS', false),
  progressTracking: getOptionalEnvBool('UPLOAD_PROGRESS', true),
});
