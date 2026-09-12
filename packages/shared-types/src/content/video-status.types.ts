import { StatusObject } from '../common/status.types';
import { VIDEO_STATUS } from '@vubon/shared-constants/src/content/video-status.constants';

export interface VideoStatus extends StatusObject {
  type: keyof typeof VIDEO_STATUS | string;
  category: 'video';
  isUploading: boolean;
  isProcessing: boolean;
  isReady: boolean;
  isPublished: boolean;
  isUnpublished: boolean;
  isFailed: boolean;
  isDeleted: boolean;
}

export type VideoStatusKey = keyof typeof VIDEO_STATUS;
