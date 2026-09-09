import { BaseEntity } from '../../common/base.types';
import { User } from '../../user/user.types';
import { VENDOR_REVIEW } from '@vubon/shared-constants/src/business/vendor/vendor-review.constants';
import { Vendor } from './vendor.types';

export interface VendorReview extends BaseEntity {
  reviewId: string;
  vendorId: string;
  vendor: Vendor;
  userId: string;
  user: User;
  rating: number;
  title: string;
  content: string;
  status: keyof typeof VENDOR_REVIEW.STATUS | string;
  type: keyof typeof VENDOR_REVIEW.REVIEW_TYPES | string;
  images: string[];
  video?: string;
  pros?: string[];
  cons?: string[];
  isVerifiedPurchase: boolean;
  isHelpful: boolean;
  helpfulCount: number;
  notHelpfulCount: number;
  reportedCount: number;
  repliedAt?: Date;
  replyContent?: string;
  metadata: Record<string, unknown>;
}
