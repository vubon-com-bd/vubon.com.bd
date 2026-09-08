import { STATUS } from '../common/status.constants';
import { PERMISSIONS } from '../common/permissions.constants';
import { MEDIA_TYPE } from './media-type.constants';
import { MEDIA_STATUS } from './media-status.constants';
import { MEDIA_FORMAT } from './media-format.constants';

export const MEDIA = {
  STATUS: {
    ...STATUS,
    ...MEDIA_STATUS,
    UPLOADING: 'uploading',
    PROCESSING: 'processing',
    UPLOADED: 'uploaded',
    FAILED: 'failed',
  },
  PERMISSIONS: {
    ...PERMISSIONS,
    VIEW: 'media:view',
    UPLOAD: 'media:upload',
    UPDATE: 'media:update',
    DELETE: 'media:delete',
    MANAGE: 'media:manage',
  },
  MEDIA_TYPE: { ...MEDIA_TYPE },
  MEDIA_STATUS: { ...MEDIA_STATUS },
  MEDIA_FORMAT: { ...MEDIA_FORMAT },
  MAX_FILE_SIZE_MB: 10,
  MAX_IMAGE_SIZE_MB: 5,
  MAX_VIDEO_SIZE_MB: 50,
  MAX_DOCUMENT_SIZE_MB: 20,
  ALLOWED_EXTENSIONS: [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'svg',
    'mp4',
    'avi',
    'mkv',
    'pdf',
    'doc',
    'docx',
    'xls',
    'xlsx',
  ],
} as const;
