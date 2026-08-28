/**
 * Vendor Review Types
 * Type definitions for vendor reviews based on shared-constants
 * @module VendorReviewTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor review
// ============================================================
import {
  // Vendor Review
  VENDOR_REVIEW,
  VendorReviewType,
  VendorReviewStatus,
  VendorReviewCategory,
  VendorReviewColor,
  VendorReviewIcon,
  VendorReviewHelpfulness,
  vendorReviewGetTypeLabel,
  vendorReviewGetStatusLabel,
  vendorReviewIsApproved,
  vendorReviewIsPending,
  vendorReviewIsVisible,
  vendorReviewGetCategory,
  vendorReviewGetCategoryLabel,
  vendorReviewIsPositive,
  vendorReviewIsNegative,
  vendorReviewGetHelpfulnessLabel,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Review Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Vendor review filter
 */
export interface VendorReviewFilter {
  ids?: ID[];
  vendorIds?: ID[];
  userIds?: ID[];
  types?: VendorReviewType[];
  statuses?: VendorReviewStatus[];
  categories?: VendorReviewCategory[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minRating?: number;
  maxRating?: number;
  isApproved?: boolean;
  isPending?: boolean;
  isVisible?: boolean;
  isPositive?: boolean;
  isNegative?: boolean;
  searchTerm?: string;
  title?: string;
}

/**
 * Vendor review statistics
 */
export interface VendorReviewStatistics {
  vendorId: ID;
  totalReviews: number;
  approvedReviews: number;
  pendingReviews: number;
  rejectedReviews: number;
  flaggedReviews: number;
  hiddenReviews: number;
  deletedReviews: number;
  positiveReviews: number;
  neutralReviews: number;
  negativeReviews: number;
  byType: Record<VendorReviewType, number>;
  byStatus: Record<VendorReviewStatus, number>;
  byCategory: Record<VendorReviewCategory, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageRating: number;
  maxRating: number;
  minRating: number;
  totalHelpful: number;
  totalUnhelpful: number;
  totalReports: number;
  mostFrequentType: VendorReviewType;
  mostFrequentStatus: VendorReviewStatus;
  mostFrequentCategory: VendorReviewCategory;
}

/**
 * Vendor review summary
 */
export interface VendorReviewSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalReviews: number;
  approved: number;
  pending: number;
  rejected: number;
  flagged: number;
  hidden: number;
  deleted: number;
  positive: number;
  neutral: number;
  negative: number;
  byType: Record<VendorReviewType, number>;
  byStatus: Record<VendorReviewStatus, number>;
  byCategory: Record<VendorReviewCategory, number>;
  reviewTrend: {
    date: Date;
    total: number;
    approved: number;
    pending: number;
  }[];
  topTypes: {
    type: VendorReviewType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: VendorReviewStatus;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: VendorReviewCategory;
    count: number;
    label: string;
  }[];
  ratingDistribution: {
    rating: number;
    count: number;
    percentage: number;
  }[];
  overallMetrics: {
    averageRating: number;
    maxRating: number;
    minRating: number;
    approvalRate: number;
  };
}

/**
 * Vendor review configuration
 */
export interface VendorReviewConfiguration {
  enabled: boolean;
  defaultType: VendorReviewType;
  requirePurchase: boolean;
  requireTitle: boolean;
  allowAnonymous: boolean;
  allowImages: boolean;
  allowVideos: boolean;
  maxTitleLength: number;
  maxContentLength: number;
  maxReviewsPerDay: number;
  maxReviewsPerVendor: number;
  minCharacters: number;
  autoApprove: boolean;
  moderationEnabled: boolean;
  requireVerification: boolean;
  notificationOnReview: boolean;
  notificationOnApproval: boolean;
  notificationOnRejection: boolean;
  notificationOnFlag: boolean;
  alertConfig?: VendorReviewAlertConfig;
}

/**
 * Vendor review alert configuration
 */
export interface VendorReviewAlertConfig {
  enabled: boolean;
  lowRatingAlert: boolean;
  lowRatingThreshold: number;
  spamAlert: boolean;
  offensiveContentAlert: boolean;
  reviewSpikeAlert: boolean;
  reviewSpikeThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Vendor review history
 */
export interface VendorReviewHistory extends BaseEntity, Timestamp {
  id: ID;
  reviewId: ID;
  vendorId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'approve'
    | 'reject'
    | 'flag'
    | 'unflag'
    | 'hide'
    | 'unhide'
    | 'delete'
    | 'restore';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Vendor review validation
 */
export interface VendorReviewValidation {
  isValid: boolean;
  reviewId: ID;
  vendorId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor review helpful feedback
 */
export interface VendorReviewHelpfulFeedback extends BaseEntity, Timestamp {
  id: ID;
  reviewId: ID;
  userId: ID;
  type: VendorReviewHelpfulness;
  metadata?: Metadata;
}

/**
 * Vendor review export
 */
export interface VendorReviewExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VendorReviewFilter;
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
  // Vendor Review
  VENDOR_REVIEW,
  VendorReviewType,
  VendorReviewStatus,
  VendorReviewCategory,
  VendorReviewColor,
  VendorReviewIcon,
  VendorReviewHelpfulness,
  vendorReviewGetTypeLabel,
  vendorReviewGetStatusLabel,
  vendorReviewIsApproved,
  vendorReviewIsPending,
  vendorReviewIsVisible,
  vendorReviewGetCategory,
  vendorReviewGetCategoryLabel,
  vendorReviewIsPositive,
  vendorReviewIsNegative,
  vendorReviewGetHelpfulnessLabel,
};
