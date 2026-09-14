/**
 * Azure Blob Storage configuration
 * @module shared-config/infrastructure/storage
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const AZURE_BLOB_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('AZURE_BLOB_ENABLED', false),
  accountName: getOptionalEnv('AZURE_BLOB_ACCOUNT', ''),
  accountKey: getOptionalEnv('AZURE_BLOB_KEY', ''),
  connectionString: getOptionalEnv('AZURE_BLOB_CONNECTION_STRING', ''),
  containerName: getOptionalEnv('AZURE_BLOB_CONTAINER', 'vubon-files'),
  endpoint: getOptionalEnv('AZURE_BLOB_ENDPOINT', ''),
  publicAccess: getOptionalEnvBool('AZURE_BLOB_PUBLIC_ACCESS', false),
  timeoutMs: getOptionalEnvInt('AZURE_BLOB_TIMEOUT_MS', 60000),
  maxRetries: getOptionalEnvInt('AZURE_BLOB_MAX_RETRIES', 3),
  blockSizeBytes: getOptionalEnvInt('AZURE_BLOB_BLOCK_SIZE_BYTES', 4 * 1024 * 1024),
  parallelUploads: getOptionalEnvInt('AZURE_BLOB_PARALLEL_UPLOADS', 4),
} as const);

export type AzureBlobConfig = typeof AZURE_BLOB_CONFIG;
