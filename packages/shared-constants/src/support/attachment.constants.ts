import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { DOCUMENT } from '../common/document.constants';

export const ATTACHMENT = {
  TYPES: {
    ...COMMON_TYPES,
    ...DOCUMENT.TYPES,
    IMAGE: 'image',
    DOCUMENT: 'document',
    VIDEO: 'video',
    AUDIO: 'audio',
    OTHER: 'other',
  },
  FILE_TYPES: { ...DOCUMENT.TYPES },
  MAX_ATTACHMENTS: 10,
  MAX_FILE_SIZE_MB: 10,
  ALLOWED_EXTENSIONS: [
    'pdf',
    'doc',
    'docx',
    'xls',
    'xlsx',
    'txt',
    'csv',
    'json',
    'xml',
    'zip',
    'rar',
  ],
  ALLOWED_IMAGE_EXTENSIONS: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'],
  ALLOWED_VIDEO_EXTENSIONS: ['mp4', 'avi', 'mkv', 'mov', 'wmv'],
  ALLOWED_AUDIO_EXTENSIONS: ['mp3', 'wav', 'aac', 'ogg'],
} as const;
