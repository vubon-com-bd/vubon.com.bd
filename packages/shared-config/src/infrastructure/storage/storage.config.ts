/**
 * Storage base configuration
 * @module shared-config/infrastructure/storage
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const STORAGE_CONFIG = Object.freeze({
  provider: getOptionalEnv('STORAGE_PROVIDER', 'local'), // local | s3 | gcs | azure
  bucket: getOptionalEnv('STORAGE_BUCKET', 'vubon-files'),
  region: getOptionalEnv('STORAGE_REGION', 'ap-south-1'),
  rootPrefix: getOptionalEnv('STORAGE_ROOT_PREFIX', 'uploads'),
  publicRead: getOptionalEnvBool('STORAGE_PUBLIC_READ', false),
  signedUrlExpirySeconds: getOptionalEnvInt('STORAGE_SIGNED_URL_EXPIRY_SECONDS', 3600),
  maxFileSizeMb: getOptionalEnvInt('STORAGE_MAX_FILE_SIZE_MB', 25),
  maxFilesPerUpload: getOptionalEnvInt('STORAGE_MAX_FILES_PER_UPLOAD', 10),
  uploadTimeoutMs: getOptionalEnvInt('STORAGE_UPLOAD_TIMEOUT_MS', 60000),
  downloadTimeoutMs: getOptionalEnvInt('STORAGE_DOWNLOAD_TIMEOUT_MS', 60000),
  encryptionAtRest: getOptionalEnvBool('STORAGE_ENCRYPTION_AT_REST', true),
  versioningEnabled: getOptionalEnvBool('STORAGE_VERSIONING_ENABLED', false),
  lifecycleDays: getOptionalEnvInt('STORAGE_LIFECYCLE_DAYS', 365),
} as const);

export type StorageConfig = typeof STORAGE_CONFIG;
