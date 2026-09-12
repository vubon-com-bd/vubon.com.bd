import { STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { VIDEO_STATUS } from './video-status.constants';
import { MEDIA } from './media.constants';

export const CONTENT_VIDEO = {
  STATUS: {
    ...STATUS,
    ...VIDEO_STATUS,
    UPLOADING: 'uploading',
    PROCESSING: 'processing',
    READY: 'ready',
    FAILED: 'failed',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'video:view',
    UPLOAD: 'video:upload',
    UPDATE: 'video:update',
    DELETE: 'video:delete',
  },
  VIDEO_STATUS: { ...VIDEO_STATUS },
  MEDIA: { ...MEDIA },
  VIDEO_TYPES: {
    TUTORIAL: 'tutorial',
    PROMOTIONAL: 'promotional',
    PRODUCT: 'product',
    REVIEW: 'review',
    INTERVIEW: 'interview',
    WEBINAR: 'webinar',
  },
  MAX_DURATION_MINUTES: 120,
  MIN_DURATION_SECONDS: 10,
  MAX_VIDEO_SIZE_MB: 500,
  SUPPORTED_FORMATS: ['mp4', 'avi', 'mkv', 'mov', 'wmv'],
} as const;
