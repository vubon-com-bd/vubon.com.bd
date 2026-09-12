import { BaseEntity } from '../common/base.types';
import { User } from '../user/user.types';
import { RATING } from '@vubon/shared-constants/src/common/rating.constants';
import { TESTIMONIAL_STATUS } from '@vubon/shared-constants/src/content/testimonial-status.constants';

export interface Testimonial extends BaseEntity {
  testimonialId: string;
  content: string;
  rating: keyof typeof RATING | string;
  status: keyof typeof TESTIMONIAL_STATUS | string;
  userId: string;
  user: User;
  name: string;
  avatar?: string;
  position?: string;
  company?: string;
  image?: string;
  video?: string;
  isVerified: boolean;
  isFeatured: boolean;
  isApproved: boolean;
  approvedAt?: Date;
  metadata: Record<string, unknown>;
}
