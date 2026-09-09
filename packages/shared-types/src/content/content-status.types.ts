import { StatusObject } from '../common/status.types';
import { CONTENT_STATUS } from '@vubon/shared-constants/src/content/content-status.constants';

export interface ContentStatus extends StatusObject {
  type: keyof typeof CONTENT_STATUS | string;
  category: 'content';
  isDraft: boolean;
  isPendingReview: boolean;
  isInReview: boolean;
  isApproved: boolean;
  isRejected: boolean;
  isPublished: boolean;
  isScheduled: boolean;
  isUnpublished: boolean;
  isArchived: boolean;
  isDeleted: boolean;
  isExpired: boolean;
  isFeatured: boolean;
}

export type ContentStatusKey = keyof typeof CONTENT_STATUS;
