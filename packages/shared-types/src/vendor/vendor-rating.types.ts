/**
 * Vendor Rating Types
 * Type definitions for vendor ratings based on shared-constants
 * @module VendorRatingTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor rating
// ============================================================
import {
  // Vendor Rating
  VENDOR_RATING,
  VendorRatingType,
  VendorRatingLevel,
  VendorRatingScore,
  VendorRatingColor,
  VendorRatingIcon,
  VendorRatingCategory,
  vendorRatingGetTypeLabel,
  vendorRatingGetLevel,
  vendorRatingGetLevelLabel,
  vendorRatingGetColor,
  vendorRatingGetStars,
  vendorRatingGetCategory,
  vendorRatingIsPositive,
  vendorRatingIsNegative,
  vendorRatingGetAverageScore,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Rating Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Vendor rating filter
 */
export interface VendorRatingFilter {
  ids?: ID[];
  vendorIds?: ID[];
  userIds?: ID[];
  types?: VendorRatingType[];
  levels?: VendorRatingLevel[];
  categories?: VendorRatingCategory[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isPositive?: boolean;
  isNegative?: boolean;
  minScore?: number;
  maxScore?: number;
  searchTerm?: string;
}

/**
 * Vendor rating statistics
 */
export interface VendorRatingStatistics {
  vendorId: ID;
  totalRatings: number;
  positiveRatings: number;
  neutralRatings: number;
  negativeRatings: number;
  byType: Record<VendorRatingType, number>;
  byLevel: Record<VendorRatingLevel, number>;
  byCategory: Record<VendorRatingCategory, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageScore: number;
  maxScore: number;
  minScore: number;
  overallLevel: VendorRatingLevel;
  overallCategory: VendorRatingCategory;
  mostFrequentType: VendorRatingType;
  mostFrequentLevel: VendorRatingLevel;
  mostFrequentCategory: VendorRatingCategory;
}

/**
 * Vendor rating summary
 */
export interface VendorRatingSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalRatings: number;
  positive: number;
  neutral: number;
  negative: number;
  byType: Record<VendorRatingType, number>;
  byLevel: Record<VendorRatingLevel, number>;
  byCategory: Record<VendorRatingCategory, number>;
  ratingTrend: {
    date: Date;
    averageScore: number;
    level: VendorRatingLevel;
  }[];
  topTypes: {
    type: VendorRatingType;
    count: number;
    label: string;
  }[];
  topLevels: {
    level: VendorRatingLevel;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: VendorRatingCategory;
    count: number;
    label: string;
  }[];
  overallMetrics: {
    averageScore: number;
    maxScore: number;
    minScore: number;
    overallLevel: VendorRatingLevel;
    overallCategory: VendorRatingCategory;
  };
}

/**
 * Vendor rating configuration
 */
export interface VendorRatingConfiguration {
  enabled: boolean;
  defaultType: VendorRatingType;
  minScore: number;
  maxScore: number;
  defaultScore: number;
  minRatingsForAverage: number;
  minRatingsForFeatured: number;
  maxRatingsPerDay: number;
  maxRatingsPerVendor: number;
  requirePurchase: boolean;
  allowAnonymous: boolean;
  requireComment: boolean;
  autoApprove: boolean;
  moderationEnabled: boolean;
  notificationOnRating: boolean;
  notificationOnLevelChange: boolean;
  alertConfig?: VendorRatingAlertConfig;
}

/**
 * Vendor rating alert configuration
 */
export interface VendorRatingAlertConfig {
  enabled: boolean;
  lowRatingAlert: boolean;
  lowRatingThreshold: number;
  ratingSpikeAlert: boolean;
  suspiciousRatingAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Vendor rating history
 */
export interface VendorRatingHistory extends BaseEntity, Timestamp {
  id: ID;
  ratingId: ID;
  vendorId: ID;
  userId: ID;
  action: 'create' | 'update' | 'delete' | 'restore' | 'approve' | 'reject';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Vendor rating validation
 */
export interface VendorRatingValidation {
  isValid: boolean;
  ratingId: ID;
  vendorId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor rating export
 */
export interface VendorRatingExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VendorRatingFilter;
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
  // Vendor Rating
  VENDOR_RATING,
  VendorRatingType,
  VendorRatingLevel,
  VendorRatingScore,
  VendorRatingColor,
  VendorRatingIcon,
  VendorRatingCategory,
  vendorRatingGetTypeLabel,
  vendorRatingGetLevel,
  vendorRatingGetLevelLabel,
  vendorRatingGetColor,
  vendorRatingGetStars,
  vendorRatingGetCategory,
  vendorRatingIsPositive,
  vendorRatingIsNegative,
  vendorRatingGetAverageScore,
};
