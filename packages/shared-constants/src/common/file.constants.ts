export const FILE_TYPE = {
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio',
  DOCUMENT: 'document',
  ARCHIVE: 'archive',
  OTHER: 'other',
} as const;

export const FILE_SIZE = {
  KB: 1024,
  MB: 1024 * 1024,
  GB: 1024 * 1024 * 1024,
  MAX_UPLOAD_MB: 25,
  MAX_UPLOAD_BYTES: 25 * 1024 * 1024,
  MAX_IMAGE_MB: 10,
  MAX_VIDEO_MB: 500,
  MAX_AUDIO_MB: 50,
  MAX_DOCUMENT_MB: 25,
} as const;

export type FileTypeType = (typeof FILE_TYPE)[keyof typeof FILE_TYPE];
