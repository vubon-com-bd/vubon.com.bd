import { TYPES as COMMON_TYPES } from '../common/types.constants';
import { DOCUMENT } from '../common/document.constants';

export const MEDIA_TYPE = {
  TYPES: {
    ...COMMON_TYPES,
    ...DOCUMENT.TYPES,
    IMAGE: 'image',
    VIDEO: 'video',
    AUDIO: 'audio',
    DOCUMENT: 'document',
    OTHER: 'other',
  },
  IMAGE_TYPES: { ...DOCUMENT.TYPES },
  VIDEO_TYPES: { ...DOCUMENT.TYPES },
  DOCUMENT_TYPES: { ...DOCUMENT.TYPES },
  AUDIO_TYPES: { ...DOCUMENT.TYPES },
} as const;
