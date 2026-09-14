/**
 * Google Cloud Storage configuration
 * @module shared-config/infrastructure/storage
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const GCS_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('GCS_ENABLED', false),
  projectId: getOptionalEnv('GCS_PROJECT_ID', ''),
  bucket: getOptionalEnv('GCS_BUCKET', ''),
  keyFilename: getOptionalEnv('GCS_KEY_FILENAME', ''),
  credentialsJson: getOptionalEnv('GCS_CREDENTIALS_JSON', ''),
  location: getOptionalEnv('GCS_LOCATION', 'asia-south1'),
  storageClass: getOptionalEnv('GCS_STORAGE_CLASS', 'STANDARD'),
  uniformBucketLevelAccess: getOptionalEnvBool('GCS_UNIFORM_ACCESS', true),
  publicRead: getOptionalEnvBool('GCS_PUBLIC_READ', false),
  timeoutMs: getOptionalEnvInt('GCS_TIMEOUT_MS', 60000),
  retries: getOptionalEnvInt('GCS_RETRIES', 3),
} as const);

export type GcsConfig = typeof GCS_CONFIG;
