/**
 * Review Types
 * Type definitions for product reviews based on shared-constants
 * @module ReviewTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants product
// ============================================================
import {
  // Review
  PRODUCTREVIEW,
  ProductReviewStatus,
  ProductReviewType,
  ProductReviewRating,
  ProductReviewVerification,
  ProductReviewDefault,
  ProductReviewLimit,
  productreviewGetStatusLabel,
  productreviewGetTypeLabel,
  productreviewGetRatingLabel,
  productreviewGetVerificationLabel,
  productreviewIsApproved,
  productreviewIsPending,
  productreviewIsRejected,
  productreviewIsVerified,
  productreviewGetDefaultRating,
  productreviewGetMaxImages,
} from '@vubon/shared-constants';

// ============================================================
// Review Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Review filter
 */
export interface ReviewFilter {
  ids?: ID[];
  productIds?: ID[];
  userIds?: ID[];
  statuses?: ProductReviewStatus[];
  types?: ProductReviewType[];
  ratings?: ProductReviewRating[];
  verifications?: ProductReviewVerification[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isApproved?: boolean;
  isPending?: boolean;
  isRejected?: boolean;
  isVerified?: boolean;
  minHelpfulCount?: number;
  maxHelpfulCount?: number;
  hasImages?: boolean;
  searchTerm?: string;
}

/**
 * Review statistics
 */
export interface ReviewStatistics {
  productId: ID;
  totalReviews: number;
  approvedReviews: number;
  pendingReviews: number;
  rejectedReviews: number;
  verifiedReviews: number;
  byStatus: Record<ProductReviewStatus, number>;
  byType: Record<ProductReviewType, number>;
  byRating: Record<ProductReviewRating, number>;
  byVerification: Record<ProductReviewVerification, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageRating: number;
  maxRating: number;
  minRating: number;
  reviewsWithImages: number;
  totalHelpful: number;
  totalUnhelpful: number;
  mostFrequentStatus: ProductReviewStatus;
  mostFrequentRating: ProductReviewRating;
}

/**
 * Review summary
 */
export interface ReviewSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalReviews: number;
  approved: number;
  pending: number;
  rejected: number;
  verified: number;
  byStatus: Record<ProductReviewStatus, number>;
  byType: Record<ProductReviewType, number>;
  byRating: Record<ProductReviewRating, number>;
  byVerification: Record<ProductReviewVerification, number>;
  reviewTrend: {
    date: Date;
    total: number;
    approved: number;
    pending: number;
  }[];
  topStatuses: {
    status: ProductReviewStatus;
    count: number;
    label: string;
  }[];
  topRatings: {
    rating: ProductReviewRating;
    count: number;
    label: string;
  }[];
  ratingDistribution: {
    rating: number;
    count: number;
    percentage: number;
  }[];
  averageRating: number;
}

/**
 * Review configuration
 */
export interface ReviewConfiguration {
  enabled: boolean;
  defaultStatus: ProductReviewStatus;
  defaultType: ProductReviewType;
  requireVerification: boolean;
  autoApprove: boolean;
  requireTitle: boolean;
  requireContent: boolean;
  allowImages: boolean;
  maxImagesPerReview: number;
  allowAnonymous: boolean;
  requirePurchase: boolean;
  verificationMethod: 'email' | 'phone' | 'purchase' | 'manual';
  helpfulThreshold: number;
  notificationOnCreate: boolean;
  notificationOnApprove: boolean;
  notificationOnReject: boolean;
  alertConfig?: ReviewAlertConfig;
}

/**
 * Review alert configuration
 */
export interface ReviewAlertConfig {
  enabled: boolean;
  suspiciousReviewAlert: boolean;
  spamReviewAlert: boolean;
  lowRatingAlert: boolean;
  highRatingAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  lowRatingThreshold: number;
  highRatingThreshold: number;
}

/**
 * Review history
 */
export interface ReviewHistory extends BaseEntity, Timestamp {
  id: ID;
  reviewId: ID;
  productId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'approve'
    | 'reject'
    | 'delete'
    | 'restore'
    | 'verify'
    | 'helpful'
    | 'unhelpful';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Review validation
 */
export interface ReviewValidation {
  isValid: boolean;
  reviewId: ID;
  productId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Review helpful feedback
 */
export interface ReviewHelpfulFeedback extends BaseEntity, Timestamp {
  id: ID;
  reviewId: ID;
  userId: ID;
  isHelpful: boolean;
  metadata?: Metadata;
}

/**
 * Review report
 */
export interface ReviewReport extends BaseEntity, Timestamp {
  id: ID;
  reviewId: ID;
  userId: ID;
  reason: 'spam' | 'offensive' | 'inappropriate' | 'fake' | 'other';
  description?: string;
  status: 'pending' | 'resolved' | 'dismissed';
  resolvedAt?: Date;
  resolvedBy?: ID;
  metadata?: Metadata;
}

/**
 * Review export
 */
export interface ReviewExport extends BaseEntity, Timestamp {
  id: ID;
  productId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: ReviewFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Review
  PRODUCTREVIEW,
  ProductReviewStatus,
  ProductReviewType,
  ProductReviewRating,
  ProductReviewVerification,
  ProductReviewDefault,
  ProductReviewLimit,
  productreviewGetStatusLabel,
  productreviewGetTypeLabel,
  productreviewGetRatingLabel,
  productreviewGetVerificationLabel,
  productreviewIsApproved,
  productreviewIsPending,
  productreviewIsRejected,
  productreviewIsVerified,
  productreviewGetDefaultRating,
  productreviewGetMaxImages,
};
