import { STATUS as COMMON_STATUS } from '../common/status.constants';

export const MEDIA_STATUS = {
  ...COMMON_STATUS,
  UPLOADING: 'uploading',
  PROCESSING: 'processing',
  UPLOADED: 'uploaded',
  FAILED: 'failed',
  DELETED: 'deleted',
  ARCHIVED: 'archived',
} as const;
