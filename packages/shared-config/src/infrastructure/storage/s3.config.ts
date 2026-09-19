/**
 * Amazon S3 configuration
 * @module shared-config/infrastructure/storage
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const S3_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('S3_ENABLED', false),
  accessKeyId: getOptionalEnv('S3_ACCESS_KEY_ID', ''),
  secretAccessKey: getOptionalEnv('S3_SECRET_ACCESS_KEY', ''),
  region: getOptionalEnv('S3_REGION', 'ap-south-1'),
  bucket: getOptionalEnv('S3_BUCKET', ''),
  endpoint: getOptionalEnv('S3_ENDPOINT', ''),
  forcePathStyle: getOptionalEnvBool('S3_FORCE_PATH_STYLE', false),
  signatureVersion: getOptionalEnv('S3_SIGNATURE_VERSION', 'v4'),
  maxRetries: getOptionalEnvInt('S3_MAX_RETRIES', 3),
  timeoutMs: getOptionalEnvInt('S3_TIMEOUT_MS', 60000),
  useAccelerate: getOptionalEnvBool('S3_USE_ACCELERATE', false),
  serverSideEncryption: getOptionalEnv('S3_SSE', 'AES256'),
  storageClass: getOptionalEnv('S3_STORAGE_CLASS', 'STANDARD'),
} as const);

export type S3Config = typeof S3_CONFIG;
