/**
 * Review Types
 * রিভিউ সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { User } from '../../common/user';
import { REVIEW_STATUS } from '@vubon/shared-constants';

export interface ReviewImage {
  id: string;
  url: string;
  sortOrder: number;
}

export interface ReviewVideo {
  id: string;
  url: string;
  thumbnail?: string;
  sortOrder: number;
}

export interface Review extends BaseEntity {
  productId: string;
  userId: string;
  user: User;
  rating: number;
  title?: string;
  content: string;
  contentBangla?: string;
  images: ReviewImage[];
  videos: ReviewVideo[];
  status: (typeof REVIEW_STATUS)[keyof typeof REVIEW_STATUS];
  isVerifiedPurchase: boolean;
  isRecommended: boolean;
  helpfulCount: number;
  reportCount: number;
  parentId?: string;
  replies?: Review[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ReviewCreateInput {
  productId: string;
  rating: number;
  title?: string;
  content: string;
  contentBangla?: string;
  images?: ReviewImage[];
  videos?: ReviewVideo[];
  isRecommended?: boolean;
  parentId?: string;
}

export interface ReviewUpdateInput extends Partial<ReviewCreateInput> {
  status?: (typeof REVIEW_STATUS)[keyof typeof REVIEW_STATUS];
}

export interface ReviewResponse {
  review: Review;
}
