import { STATUS as COMMON_STATUS } from '../common/status.constants';
import { TYPES as COMMON_TYPES } from '../common/types.constants';

export const MESSAGE = {
  STATUS: {
    ...COMMON_STATUS,
    SENT: 'sent',
    DELIVERED: 'delivered',
    READ: 'read',
    FAILED: 'failed',
    DELETED: 'deleted',
  },
  TYPES: {
    ...COMMON_TYPES,
    TEXT: 'text',
    HTML: 'html',
    MARKDOWN: 'markdown',
    FILE: 'file',
    IMAGE: 'image',
    VIDEO: 'video',
    AUDIO: 'audio',
    SYSTEM: 'system',
  },
  MAX_MESSAGE_LENGTH: 10000,
  MAX_MEDIA_MESSAGE_SIZE_MB: 10,
  SUPPORTED_MEDIA_TYPES: ['image', 'video', 'audio', 'document'],
} as const;
