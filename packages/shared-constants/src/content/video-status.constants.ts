import { STATUS as COMMON_STATUS } from '../common/status.constants';

export const VIDEO_STATUS = {
  ...COMMON_STATUS,
  UPLOADING: 'uploading',
  PROCESSING: 'processing',
  READY: 'ready',
  PUBLISHED: 'published',
  UNPUBLISHED: 'unpublished',
  FAILED: 'failed',
  DELETED: 'deleted',
} as const;
