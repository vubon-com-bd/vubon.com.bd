/**
 * Generic file configuration
 * @module shared-config/media/file
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const FILE_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('FILE_ENABLED', true),
  maxFileSizeMb: getOptionalEnvInt('FILE_MAX_SIZE_MB', 25),
  maxFilesPerUpload: getOptionalEnvInt('FILE_MAX_PER_UPLOAD', 10),
  allowedTypes: Object.freeze([
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ] as const),
  scanForViruses: getOptionalEnvBool('FILE_VIRUS_SCAN', false),
  sanitizeFilenames: getOptionalEnvBool('FILE_SANITIZE_NAMES', true),
  preserveOriginalName: getOptionalEnvBool('FILE_PRESERVE_NAME', true),
  storagePath: getOptionalEnvBool('FILE_STORAGE_PATH', true),
});
