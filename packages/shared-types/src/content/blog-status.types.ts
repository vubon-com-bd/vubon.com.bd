import { StatusObject } from '../common/status.types';
import { BLOG_STATUS } from '@vubon/shared-constants/src/content/blog-status.constants';

export interface BlogStatus extends StatusObject {
  type: keyof typeof BLOG_STATUS | string;
  category: 'blog';
  isDraft: boolean;
  isPendingReview: boolean;
  isInReview: boolean;
  isApproved: boolean;
  isRejected: boolean;
  isPublished: boolean;
  isScheduled: boolean;
  isUnpublished: boolean;
  isArchived: boolean;
}

export type BlogStatusKey = keyof typeof BLOG_STATUS;
