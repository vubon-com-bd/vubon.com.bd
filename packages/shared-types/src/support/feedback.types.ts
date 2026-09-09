import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { RATING } from '@vubon/shared-constants/src/common/rating.constants';
import { FEEDBACK } from '@vubon/shared-constants/src/support/feedback.constants';

export interface Feedback extends BaseEntity {
  feedbackId: string;
  userId: string;
  user: User;
  type: keyof typeof FEEDBACK.FEEDBACK_TYPES | string;
  rating: keyof typeof RATING | string;
  content: string;
  status: keyof typeof FEEDBACK.STATUS | string;
  images: string[];
  isAnonymous: boolean;
  reviewedBy?: string;
  reviewedAt?: Date;
  actionedAt?: Date;
  action?: string;
  rejectedReason?: string;
  metadata: Record<string, unknown>;
}
