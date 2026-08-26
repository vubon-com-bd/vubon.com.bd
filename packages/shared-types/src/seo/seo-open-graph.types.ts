/**
 * SEO Open Graph Types
 * Type definitions for SEO Open Graph based on shared-constants
 * @module SEOOpenGraphTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import common SEO types from common
// ============================================================
import type { SEOOpenGraphType } from '../common/seo.types';

// ============================================================
// Import from shared-constants seo open graph
// ============================================================
import {
  // SEO Open Graph Main
  SEO_OPEN_GRAPH,
  SEOOpenGraphStatus,
  SEOOpenGraphProperty,
  SEOOpenGraphImageSize,
  SEOOpenGraphValidation,
  SEOOpenGraphPlatform,
  SEOOpenGraphErrorType,
  SEOOpenGraphMetric,
  getSEOOpenGraphTypeLabel,
  getSEOOpenGraphStatusLabel,
  getSEOOpenGraphPropertyLabel,
  getSEOOpenGraphPlatformLabel,
  getSEOOpenGraphErrorLabel,
  getOGStatusColor,
  isOGValid,
  isOGActive,
  getOGImageRecommendation,
  // SEO Open Graph Type
  SEO_OPEN_GRAPH_TYPE,
  SEOOpenGraphTypeCategory,
  SEOOpenGraphTypeSubType,
  SEOOpenGraphTypeContext,
  SEOOpenGraphTypePurpose,
  SEOOpenGraphTypeComplexity,
  getSEOOpenGraphCategoryLabel,
  getSEOOpenGraphSubTypeLabel,
  getSEOOpenGraphContextLabel,
  getSEOOpenGraphPurposeLabel,
  getSEOOpenGraphComplexityLabel,
  // SEO Open Graph Status
  SEO_OPEN_GRAPH_STATUS,
  SEOOpenGraphLifecycleStatus,
  SEOOpenGraphHealthStatus,
  SEOOpenGraphQualityStatus,
  SEOOpenGraphComplianceStatus,
  SEOOpenGraphPerformanceStatus,
  SEOOpenGraphStatusCategory,
  getSEOOpenGraphLifecycleLabel,
  getSEOOpenGraphHealthLabel,
  getSEOOpenGraphQualityLabel,
  getSEOOpenGraphComplianceLabel,
  getSEOOpenGraphPerformanceLabel,
  getSEOOpenGraphStatusCategory,
  getSEOOpenGraphStatusColor,
  isOGLifecycleValid,
  isOGProcessing,
} from '@vubon/shared-constants';

// ============================================================
// SEO Open Graph Extended Types
// ============================================================

/**
 * SEO Open Graph
 */
export interface SEOOpenGraph extends BaseEntity, Timestamp {
  id: ID;
  url: string;
  type: SEOOpenGraphType;
  status: SEOOpenGraphStatus;
  properties: SEOOpenGraphProperty[];
  imageSize: SEOOpenGraphImageSize;
  validation: SEOOpenGraphValidation;
  platform: SEOOpenGraphPlatform;
  isActive: boolean;
  isValid: boolean;
  isProcessing: boolean;
  checkedAt: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * SEO Open Graph filter
 */
export interface SEOOpenGraphFilter {
  ids?: ID[];
  urls?: string[];
  types?: SEOOpenGraphType[];
  statuses?: SEOOpenGraphStatus[];
  platforms?: SEOOpenGraphPlatform[];
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
 * SEO Open Graph statistics
 */
export interface SEOOpenGraphStatistics {
  totalOpenGraph: number;
  activeOpenGraph: number;
  validOpenGraph: number;
  processingOpenGraph: number;
  byType: Record<SEOOpenGraphType, number>;
  byStatus: Record<SEOOpenGraphStatus, number>;
  byPlatform: Record<SEOOpenGraphPlatform, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentType: SEOOpenGraphType;
  mostFrequentStatus: SEOOpenGraphStatus;
  mostFrequentPlatform: SEOOpenGraphPlatform;
  totalProperties: number;
  averageProperties: number;
}

/**
 * SEO Open Graph summary
 */
export interface SEOOpenGraphSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalOpenGraph: number;
  active: number;
  valid: number;
  processing: number;
  byType: Record<SEOOpenGraphType, number>;
  byStatus: Record<SEOOpenGraphStatus, number>;
  byPlatform: Record<SEOOpenGraphPlatform, number>;
  openGraphTrend: {
    date: Date;
    total: number;
    active: number;
    valid: number;
  }[];
  topTypes: {
    type: SEOOpenGraphType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: SEOOpenGraphStatus;
    count: number;
    label: string;
  }[];
  topPlatforms: {
    platform: SEOOpenGraphPlatform;
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
 * SEO Open Graph configuration
 */
export interface SEOOpenGraphConfiguration {
  enabled: boolean;
  defaultType: SEOOpenGraphType;
  defaultStatus: SEOOpenGraphStatus;
  defaultPlatform: SEOOpenGraphPlatform;
  defaultImageSize: SEOOpenGraphImageSize;
  autoGenerate: boolean;
  autoValidate: boolean;
  requireValidation: boolean;
  requireProperties: boolean;
  maxOpenGraphPerUrl: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnValidation: boolean;
  notificationOnError: boolean;
  alertConfig?: SEOOpenGraphAlertConfig;
}

/**
 * SEO Open Graph alert configuration
 */
export interface SEOOpenGraphAlertConfig {
  enabled: boolean;
  validationFailureAlert: boolean;
  propertyMissingAlert: boolean;
  imageSizeAlert: boolean;
  generationErrorAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * SEO Open Graph history
 */
export interface SEOOpenGraphHistory extends BaseEntity, Timestamp {
  id: ID;
  openGraphId: ID;
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
 * SEO Open Graph validation detail
 */
export interface SEOOpenGraphValidationDetail extends BaseEntity, Timestamp {
  id: ID;
  openGraphId: ID;
  isValid: boolean;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
  checkedAt: Date;
  metadata?: Metadata;
}

/**
 * SEO Open Graph property detail
 */
export interface SEOOpenGraphPropertyDetail extends BaseEntity, Timestamp {
  id: ID;
  openGraphId: ID;
  property: SEOOpenGraphProperty;
  value: string;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * SEO Open Graph export
 */
export interface SEOOpenGraphExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx' | 'html';
  filter: SEOOpenGraphFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything (SEOOpenGraphType বাদে)
// ============================================================

export {
  // SEO Open Graph Main
  SEO_OPEN_GRAPH,
  SEOOpenGraphStatus,
  SEOOpenGraphProperty,
  SEOOpenGraphImageSize,
  SEOOpenGraphValidation,
  SEOOpenGraphPlatform,
  SEOOpenGraphErrorType,
  SEOOpenGraphMetric,
  getSEOOpenGraphTypeLabel,
  getSEOOpenGraphStatusLabel,
  getSEOOpenGraphPropertyLabel,
  getSEOOpenGraphPlatformLabel,
  getSEOOpenGraphErrorLabel,
  getOGStatusColor,
  isOGValid,
  isOGActive,
  getOGImageRecommendation,
  // SEO Open Graph Type (SEOOpenGraphType বাদে)
  SEO_OPEN_GRAPH_TYPE,
  SEOOpenGraphTypeCategory,
  SEOOpenGraphTypeSubType,
  SEOOpenGraphTypeContext,
  SEOOpenGraphTypePurpose,
  SEOOpenGraphTypeComplexity,
  getSEOOpenGraphCategoryLabel,
  getSEOOpenGraphSubTypeLabel,
  getSEOOpenGraphContextLabel,
  getSEOOpenGraphPurposeLabel,
  getSEOOpenGraphComplexityLabel,
  // SEO Open Graph Status
  SEO_OPEN_GRAPH_STATUS,
  SEOOpenGraphLifecycleStatus,
  SEOOpenGraphHealthStatus,
  SEOOpenGraphQualityStatus,
  SEOOpenGraphComplianceStatus,
  SEOOpenGraphPerformanceStatus,
  SEOOpenGraphStatusCategory,
  getSEOOpenGraphLifecycleLabel,
  getSEOOpenGraphHealthLabel,
  getSEOOpenGraphQualityLabel,
  getSEOOpenGraphComplianceLabel,
  getSEOOpenGraphPerformanceLabel,
  getSEOOpenGraphStatusCategory,
  getSEOOpenGraphStatusColor,
  isOGLifecycleValid,
  isOGProcessing,
};
