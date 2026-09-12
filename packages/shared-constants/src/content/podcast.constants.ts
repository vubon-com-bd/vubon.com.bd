import { STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { PODCAST_STATUS } from './podcast-status.constants';
import { MEDIA } from './media.constants';

export const PODCAST = {
  STATUS: {
    ...STATUS,
    ...PODCAST_STATUS,
    DRAFT: 'draft',
    PUBLISHED: 'published',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'podcast:view',
    CREATE: 'podcast:create',
    UPDATE: 'podcast:update',
    DELETE: 'podcast:delete',
  },
  PODCAST_STATUS: { ...PODCAST_STATUS },
  MEDIA: { ...MEDIA },
  PODCAST_TYPES: {
    INTERVIEW: 'interview',
    SOLO: 'solo',
    PANEL: 'panel',
    STORY: 'story',
  },
  MAX_DURATION_MINUTES: 180,
  MIN_DURATION_MINUTES: 5,
  MAX_AUDIO_SIZE_MB: 200,
  SUPPORTED_FORMATS: ['mp3', 'wav', 'aac', 'ogg'],
} as const;
