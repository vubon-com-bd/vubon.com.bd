import { BaseEntity } from '../../common/base.types';
import { User } from '../../user/user.types';
import { RATING } from '@vubon/shared-constants/src/common/rating.constants';
import { Product } from './product.types';

export interface Review extends BaseEntity {
  reviewId: string;
  productId: string;
  product: Product;
  userId: string;
  user: User;
  rating: keyof typeof RATING | string;
  title: string;
  content: string;
  status: string;
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
