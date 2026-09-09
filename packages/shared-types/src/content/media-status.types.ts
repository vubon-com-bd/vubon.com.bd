import { StatusObject } from '../common/status.types';
import { MEDIA_STATUS } from '@vubon/shared-constants/src/content/media-status.constants';

export interface MediaStatus extends StatusObject {
  type: keyof typeof MEDIA_STATUS | string;
  category: 'media';
  isUploading: boolean;
  isProcessing: boolean;
  isUploaded: boolean;
  isFailed: boolean;
  isDeleted: boolean;
  isArchived: boolean;
}

export type MediaStatusKey = keyof typeof MEDIA_STATUS;
