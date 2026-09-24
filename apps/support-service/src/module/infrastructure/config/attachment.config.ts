export const ATTACHMENT_CONFIG = Object.freeze({
  maxFileSizeMB: 25,
  maxFilesPerMessage: 5,
  allowedTypes: [
    'image',
    'video',
    'audio',
    'document',
    'archive',
  ] as const,
  allowedMimeTypes: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/zip',
  ] as const,
} as const);
