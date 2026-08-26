/**
 * SEO Twitter Card Types
 * Type definitions for SEO Twitter Card based on shared-constants
 * @module SEOTwitterCardTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import common SEO types from common
// ============================================================
import type { SEOTwitterCardType } from '../common/seo.types';

// ============================================================
// Import from shared-constants seo twitter card
// ============================================================
import {
  // SEO Twitter Card Main
  SEO_TWITTER_CARD,
  SEOTwitterCardStatus,
  SEOTwitterCardProperty,
  SEOTwitterCardImageSize,
  SEOTwitterCardValidation,
  SEOTwitterCardPlatform,
  SEOTwitterCardErrorType,
  SEOTwitterCardMetric,
  getSEOTwitterCardTypeLabel,
  getSEOTwitterCardStatusLabel,
  getSEOTwitterCardPropertyLabel,
  getSEOTwitterCardPlatformLabel,
  getSEOTwitterCardErrorLabel,
  getTwitterCardStatusColor,
  isTwitterCardValid,
  isTwitterCardActive,
  getTwitterCardImageRecommendation,
  // SEO Twitter Card Type
  SEO_TWITTER_CARD_TYPE,
  SEOTwitterCardTypeCategory,
  SEOTwitterCardTypeSubType,
  SEOTwitterCardTypeContext,
  SEOTwitterCardTypePurpose,
  SEOTwitterCardTypeComplexity,
  SEOTwitterCardTypeDisplay,
  getSEOTwitterCardCategoryLabel,
  getSEOTwitterCardSubTypeLabel,
  getSEOTwitterCardContextLabel,
  getSEOTwitterCardPurposeLabel,
  getSEOTwitterCardComplexityLabel,
  getSEOTwitterCardDisplayLabel,
  // SEO Twitter Card Status
  SEO_TWITTER_CARD_STATUS,
  SEOTwitterCardLifecycleStatus,
  SEOTwitterCardHealthStatus,
  SEOTwitterCardQualityStatus,
  SEOTwitterCardComplianceStatus,
  SEOTwitterCardPerformanceStatus,
  SEOTwitterCardStatusCategory,
  getSEOTwitterCardLifecycleLabel,
  getSEOTwitterCardHealthLabel,
  getSEOTwitterCardQualityLabel,
  getSEOTwitterCardComplianceLabel,
  getSEOTwitterCardPerformanceLabel,
  getSEOTwitterCardStatusCategory,
  getSEOTwitterCardStatusColor,
  isTwitterCardLifecycleValid,
  isTwitterCardProcessing,
} from '@vubon/shared-constants';

// ============================================================
// SEO Twitter Card Extended Types
// ============================================================

/**
 * SEO Twitter Card
 */
export interface SEOTwitterCard extends BaseEntity, Timestamp {
  id: ID;
  url: string;
  type: SEOTwitterCardType;
  status: SEOTwitterCardStatus;
  properties: SEOTwitterCardProperty[];
  imageSize: SEOTwitterCardImageSize;
  validation: SEOTwitterCardValidation;
  platform: SEOTwitterCardPlatform;
  isActive: boolean;
  isValid: boolean;
  isProcessing: boolean;
  checkedAt: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * SEO Twitter Card filter
 */
export interface SEOTwitterCardFilter {
  ids?: ID[];
  urls?: string[];
  types?: SEOTwitterCardType[];
  statuses?: SEOTwitterCardStatus[];
  platforms?: SEOTwitterCardPlatform[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isValid?: boolean;
  isProcessing?: boolean;
  searchTerm?: string;
}

/**
 * SEO Twitter Card statistics
 */
export interface SEOTwitterCardStatistics {
  totalTwitterCards: number;
  activeTwitterCards: number;
  validTwitterCards: number;
  processingTwitterCards: number;
  byType: Record<SEOTwitterCardType, number>;
  byStatus: Record<SEOTwitterCardStatus, number>;
  byPlatform: Record<SEOTwitterCardPlatform, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentType: SEOTwitterCardType;
  mostFrequentStatus: SEOTwitterCardStatus;
  mostFrequentPlatform: SEOTwitterCardPlatform;
  totalProperties: number;
  averageProperties: number;
}

/**
 * SEO Twitter Card summary
 */
export interface SEOTwitterCardSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalTwitterCards: number;
  active: number;
  valid: number;
  processing: number;
  byType: Record<SEOTwitterCardType, number>;
  byStatus: Record<SEOTwitterCardStatus, number>;
  byPlatform: Record<SEOTwitterCardPlatform, number>;
  twitterCardTrend: {
    date: Date;
    total: number;
    active: number;
    valid: number;
  }[];
  topTypes: {
    type: SEOTwitterCardType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: SEOTwitterCardStatus;
    count: number;
    label: string;
  }[];
  topPlatforms: {
    platform: SEOTwitterCardPlatform;
    count: number;
    label: string;
  }[];
  propertySummary: {
    total: number;
    average: number;
    max: number;
    min: number;
  };
}

/**
 * SEO Twitter Card configuration
 */
export interface SEOTwitterCardConfiguration {
  enabled: boolean;
  defaultType: SEOTwitterCardType;
  defaultStatus: SEOTwitterCardStatus;
  defaultPlatform: SEOTwitterCardPlatform;
  defaultImageSize: SEOTwitterCardImageSize;
  autoGenerate: boolean;
  autoValidate: boolean;
  requireValidation: boolean;
  requireProperties: boolean;
  maxTwitterCardsPerUrl: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnValidation: boolean;
  notificationOnError: boolean;
  alertConfig?: SEOTwitterCardAlertConfig;
}

/**
 * SEO Twitter Card alert configuration
 */
export interface SEOTwitterCardAlertConfig {
  enabled: boolean;
  validationFailureAlert: boolean;
  propertyMissingAlert: boolean;
  imageSizeAlert: boolean;
  generationErrorAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * SEO Twitter Card history
 */
export interface SEOTwitterCardHistory extends BaseEntity, Timestamp {
  id: ID;
  twitterCardId: ID;
  action:
    | 'create'
    | 'update'
    | 'generate'
    | 'validate'
    | 'invalidate'
    | 'activate'
    | 'deactivate'
    | 'delete'
    | 'restore'
    | 'property_add'
    | 'property_remove'
    | 'property_update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * SEO Twitter Card validation detail
 */
export interface SEOTwitterCardValidationDetail extends BaseEntity, Timestamp {
  id: ID;
  twitterCardId: ID;
  isValid: boolean;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
  checkedAt: Date;
  metadata?: Metadata;
}

/**
 * SEO Twitter Card property detail
 */
export interface SEOTwitterCardPropertyDetail extends BaseEntity, Timestamp {
  id: ID;
  twitterCardId: ID;
  property: SEOTwitterCardProperty;
  value: string;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * SEO Twitter Card export
 */
export interface SEOTwitterCardExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx' | 'html';
  filter: SEOTwitterCardFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything (SEOTwitterCardType বাদে)
// ============================================================

export {
  // SEO Twitter Card Main
  SEO_TWITTER_CARD,
  SEOTwitterCardStatus,
  SEOTwitterCardProperty,
  SEOTwitterCardImageSize,
  SEOTwitterCardValidation,
  SEOTwitterCardPlatform,
  SEOTwitterCardErrorType,
  SEOTwitterCardMetric,
  getSEOTwitterCardTypeLabel,
  getSEOTwitterCardStatusLabel,
  getSEOTwitterCardPropertyLabel,
  getSEOTwitterCardPlatformLabel,
  getSEOTwitterCardErrorLabel,
  getTwitterCardStatusColor,
  isTwitterCardValid,
  isTwitterCardActive,
  getTwitterCardImageRecommendation,
  // SEO Twitter Card Type (SEOTwitterCardType বাদে)
  SEO_TWITTER_CARD_TYPE,
  SEOTwitterCardTypeCategory,
  SEOTwitterCardTypeSubType,
  SEOTwitterCardTypeContext,
  SEOTwitterCardTypePurpose,
  SEOTwitterCardTypeComplexity,
  SEOTwitterCardTypeDisplay,
  getSEOTwitterCardCategoryLabel,
  getSEOTwitterCardSubTypeLabel,
  getSEOTwitterCardContextLabel,
  getSEOTwitterCardPurposeLabel,
  getSEOTwitterCardComplexityLabel,
  getSEOTwitterCardDisplayLabel,
  // SEO Twitter Card Status
  SEO_TWITTER_CARD_STATUS,
  SEOTwitterCardLifecycleStatus,
  SEOTwitterCardHealthStatus,
  SEOTwitterCardQualityStatus,
  SEOTwitterCardComplianceStatus,
  SEOTwitterCardPerformanceStatus,
  SEOTwitterCardStatusCategory,
  getSEOTwitterCardLifecycleLabel,
  getSEOTwitterCardHealthLabel,
  getSEOTwitterCardQualityLabel,
  getSEOTwitterCardComplianceLabel,
  getSEOTwitterCardPerformanceLabel,
  getSEOTwitterCardStatusCategory,
  getSEOTwitterCardStatusColor,
  isTwitterCardLifecycleValid,
  isTwitterCardProcessing,
};
