/**
 * Vendor Review Types
 * ভেন্ডর রিভিউ সম্পর্কিত টাইপ
 */

import { BaseEntity } from '../../common/base.entity';
import { User } from '../../common/user';
import { Vendor } from './vendor.types';

export interface VendorReview extends BaseEntity {
  vendorId: string;
  vendor: Vendor;
  userId: string;
  user: User;
  rating: number;
  title?: string;
  titleBangla?: string;
  content: string;
  contentBangla?: string;
  images?: string[];
  videos?: string[];
  status: 'pending' | 'approved' | 'rejected' | 'deleted' | 'flagged';
  isVerifiedPurchase: boolean;
  isRecommended: boolean;
  helpfulCount: number;
  reportCount: number;
  response?: string;
  responseBangla?: string;
  respondedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface VendorReviewCreateInput {
  vendorId: string;
  userId: string;
  rating: number;
  title?: string;
  titleBangla?: string;
  content: string;
  contentBangla?: string;
  images?: string[];
  videos?: string[];
  isVerifiedPurchase?: boolean;
  isRecommended?: boolean;
}

export interface VendorReviewUpdateInput {
  rating?: number;
  title?: string;
  titleBangla?: string;
  content?: string;
  contentBangla?: string;
  status?: 'pending' | 'approved' | 'rejected' | 'deleted' | 'flagged';
  response?: string;
  responseBangla?: string;
  respondedAt?: Date;
}

export interface VendorReviewResponse {
  vendorReview: VendorReview;
}
