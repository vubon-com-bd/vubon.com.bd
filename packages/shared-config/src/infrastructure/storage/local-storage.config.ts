/**
 * Local filesystem storage configuration (dev/default)
 * @module shared-config/infrastructure/storage
 */
import { getOptionalEnv, getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const LOCAL_STORAGE_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('LOCAL_STORAGE_ENABLED', true),
  baseDir: getOptionalEnv('LOCAL_STORAGE_DIR', './storage/uploads'),
  publicDir: getOptionalEnv('LOCAL_STORAGE_PUBLIC_DIR', './public'),
  baseUrl: getOptionalEnv('LOCAL_STORAGE_BASE_URL', '/uploads'),
  maxFileSizeMb: getOptionalEnvInt('LOCAL_STORAGE_MAX_FILE_MB', 25),
  allowOverwrite: getOptionalEnvBool('LOCAL_STORAGE_ALLOW_OVERWRITE', false),
  sanitizeFilenames: getOptionalEnvBool('LOCAL_STORAGE_SANITIZE_FILENAMES', true),
  preserveExtension: getOptionalEnvBool('LOCAL_STORAGE_PRESERVE_EXTENSION', true),
} as const);

export type LocalStorageConfig = typeof LOCAL_STORAGE_CONFIG;
