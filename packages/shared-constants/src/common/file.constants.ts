/**
 * File Constants
 * @module shared-constants/common/file.constants
 */

export const FILE = {
  // File types
  TYPE: {
    IMAGE: 'image',
    VIDEO: 'video',
    AUDIO: 'audio',
    DOCUMENT: 'document',
    ARCHIVE: 'archive',
    CODE: 'code',
    SPREADSHEET: 'spreadsheet',
    PRESENTATION: 'presentation',
    OTHER: 'other',
  } as const,

  // File extensions
  EXTENSIONS: {
    IMAGE: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico', 'tiff'],
    VIDEO: ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv', 'flv', 'wmv', 'm4v'],
    AUDIO: ['mp3', 'wav', 'ogg', 'aac', 'flac', 'wma', 'm4a', 'opus'],
    DOCUMENT: ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt', 'md'],
    ARCHIVE: ['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz'],
    CODE: ['js', 'ts', 'jsx', 'tsx', 'py', 'java', 'c', 'cpp', 'go', 'rs', 'php', 'rb'],
    SPREADSHEET: ['xls', 'xlsx', 'csv', 'ods'],
    PRESENTATION: ['ppt', 'pptx', 'odp'],
  } as const,

  // MIME types
  MIME_TYPES: {
    // Images
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/svg+xml': 'svg',
    'image/bmp': 'bmp',

    // Videos
    'video/mp4': 'mp4',
    'video/webm': 'webm',
    'video/ogg': 'ogg',
    'video/quicktime': 'mov',
    'video/x-msvideo': 'avi',

    // Audio
    'audio/mpeg': 'mp3',
    'audio/wav': 'wav',
    'audio/ogg': 'ogg',
    'audio/aac': 'aac',
    'audio/flac': 'flac',

    // Documents
    'application/pdf': 'pdf',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'text/plain': 'txt',
    'text/csv': 'csv',

    // Archives
    'application/zip': 'zip',
    'application/x-rar-compressed': 'rar',
    'application/x-7z-compressed': '7z',

    // Spreadsheets
    'application/vnd.ms-excel': 'xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',

    // Presentations
    'application/vnd.ms-powerpoint': 'ppt',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
  } as const,

  // File sizes
  SIZE: {
    BYTE: 1,
    KB: 1024,
    MB: 1048576,
    GB: 1073741824,
    TB: 1099511627776,

    MAX_UPLOAD: {
      IMAGE: 5 * 1048576, // 5MB
      VIDEO: 100 * 1048576, // 100MB
      AUDIO: 50 * 1048576, // 50MB
      DOCUMENT: 20 * 1048576, // 20MB
      ARCHIVE: 50 * 1048576, // 50MB
      DEFAULT: 10 * 1048576, // 10MB
    },
  } as const,

  // File permissions
  PERMISSION: {
    READ: 'read',
    WRITE: 'write',
    EXECUTE: 'execute',
    DELETE: 'delete',
  } as const,

  // Storage types
  STORAGE: {
    LOCAL: 'local',
    S3: 's3',
    GCS: 'gcs',
    AZURE: 'azure',
    FTP: 'ftp',
  } as const,

  // File status
  STATUS: {
    UPLOADING: 'uploading',
    UPLOADED: 'uploaded',
    PROCESSING: 'processing',
    PROCESSED: 'processed',
    FAILED: 'failed',
    DELETED: 'deleted',
  } as const,

  // Default values
  DEFAULT: {
    MAX_SIZE_MB: 10,
    ALLOWED_EXTENSIONS: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'],
  },
} as const;

export type FileType = (typeof FILE.TYPE)[keyof typeof FILE.TYPE];
export type FileStorage = (typeof FILE.STORAGE)[keyof typeof FILE.STORAGE];
export type FileStatus = (typeof FILE.STATUS)[keyof typeof FILE.STATUS];
export type FilePermission = (typeof FILE.PERMISSION)[keyof typeof FILE.PERMISSION];
