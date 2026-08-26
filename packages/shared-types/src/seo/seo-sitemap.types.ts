/**
 * SEO Sitemap Types
 * Type definitions for SEO sitemaps based on shared-constants
 * @module SEOSitemapTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import common SEO types from common
// ============================================================
import type { SEOSitemapType } from '../common/seo.types';

// ============================================================
// Import from shared-constants seo sitemap
// ============================================================
import {
  // SEO Sitemap Main
  SEO_SITEMAP,
  SEOSitemapStatus,
  SEOSitemapPriority,
  SEOSitemapChangeFrequency,
  SEOSitemapFormat,
  SEOSitemapSize,
  SEOSitemapProtocol,
  SEOSitemapCompression,
  SEOSitemapErrorType,
  SEOSitemapMetric,
  SEOSitemapSource,
  getSEOSitemapTypeLabel,
  getSEOSitemapStatusLabel,
  getSEOSitemapPriorityLabel,
  getSEOSitemapChangeFrequencyLabel,
  getSEOSitemapFormatLabel,
  getSEOSitemapCompressionLabel,
  getSEOSitemapValidationMainLabel,
  getSEOSitemapErrorLabel,
  getSEOSitemapSourceLabel,
  getSitemapStatusColor,
  isSitemapValid,
  isSitemapActive,
  getPriorityValue,
  // SEO Sitemap Type
  SEO_SITEMAP_TYPE,
  SEOSitemapTypeCategory,
  SEOSitemapTypeSubType,
  SEOSitemapTypeGenerator,
  SEOSitemapTypeScope,
  SEOSitemapTypeStructure,
  SEOSitemapTypeAudience,
  getSEOSitemapCategoryLabel,
  getSEOSitemapSubTypeLabel,
  getSEOSitemapGeneratorLabel,
  getSEOSitemapScopeLabel,
  getSEOSitemapStructureLabel,
  getSEOSitemapAudienceLabel,
  // SEO Sitemap Status
  SEO_SITEMAP_STATUS,
  SEOSitemapLifecycleStatus,
  SEOSitemapHealthStatus,
  SEOSitemapQualityStatus,
  SEOSitemapValidationStatus,
  SEOSitemapIndexingStatus,
  SEOSitemapStatusCategory,
  getSEOSitemapLifecycleLabel,
  getSEOSitemapHealthLabel,
  getSEOSitemapQualityLabel,
  getSEOSitemapValidationStatusLabel,
  getSEOSitemapIndexingLabel,
  getSEOSitemapStatusCategory,
  getSEOSitemapStatusColor,
  isSitemapLifecycleValid,
  isSitemapProcessing,
} from '@vubon/shared-constants';

// ============================================================
// SEO Sitemap Extended Types (SEOSitemapValidationType নাম পরিবর্তন)
// ============================================================

/**
 * SEO sitemap
 */
export interface SEOSitemap extends BaseEntity, Timestamp {
  id: ID;
  filename: string;
  type: SEOSitemapType;
  status: SEOSitemapStatus;
  priority: SEOSitemapPriority;
  format: SEOSitemapFormat;
  size: SEOSitemapSize;
  protocol: SEOSitemapProtocol;
  compression: SEOSitemapCompression;
  source: SEOSitemapSource;
  urls: SEOSitemapUrl[];
  urlCount: number;
  isActive: boolean;
  isValid: boolean;
  isProcessing: boolean;
  lastModified: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * SEO sitemap URL
 */
export interface SEOSitemapUrl extends BaseEntity, Timestamp {
  id: ID;
  sitemapId: ID;
  loc: string;
  lastmod?: Date;
  changefreq: SEOSitemapChangeFrequency;
  priority: number;
  isActive: boolean;
  isIndexed: boolean;
  metadata?: Metadata;
}

/**
 * SEO sitemap validation type (নাম পরিবর্তন করা হয়েছে)
 */
export interface SEOSitemapValidationType {
  isValid: boolean;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * SEO sitemap filter
 */
export interface SEOSitemapFilter {
  ids?: ID[];
  filenames?: string[];
  types?: SEOSitemapType[];
  statuses?: SEOSitemapStatus[];
  priorities?: SEOSitemapPriority[];
  formats?: SEOSitemapFormat[];
  sources?: SEOSitemapSource[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isValid?: boolean;
  isProcessing?: boolean;
  minUrlCount?: number;
  maxUrlCount?: number;
  searchTerm?: string;
}

/**
 * SEO sitemap statistics
 */
export interface SEOSitemapStatistics {
  totalSitemaps: number;
  activeSitemaps: number;
  validSitemaps: number;
  processingSitemaps: number;
  byType: Record<SEOSitemapType, number>;
  byStatus: Record<SEOSitemapStatus, number>;
  byPriority: Record<SEOSitemapPriority, number>;
  byFormat: Record<SEOSitemapFormat, number>;
  bySource: Record<SEOSitemapSource, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalUrls: number;
  averageUrls: number;
  maxUrls: number;
  minUrls: number;
  mostFrequentType: SEOSitemapType;
  mostFrequentStatus: SEOSitemapStatus;
  mostFrequentFormat: SEOSitemapFormat;
}

/**
 * SEO sitemap summary
 */
export interface SEOSitemapSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSitemaps: number;
  active: number;
  valid: number;
  processing: number;
  byType: Record<SEOSitemapType, number>;
  byStatus: Record<SEOSitemapStatus, number>;
  byPriority: Record<SEOSitemapPriority, number>;
  byFormat: Record<SEOSitemapFormat, number>;
  bySource: Record<SEOSitemapSource, number>;
  sitemapTrend: {
    date: Date;
    total: number;
    active: number;
    valid: number;
  }[];
  topTypes: {
    type: SEOSitemapType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: SEOSitemapStatus;
    count: number;
    label: string;
  }[];
  topFormats: {
    format: SEOSitemapFormat;
    count: number;
    label: string;
  }[];
  urlSummary: {
    total: number;
    average: number;
    max: number;
    min: number;
  };
}

/**
 * SEO sitemap configuration
 */
export interface SEOSitemapConfiguration {
  enabled: boolean;
  defaultType: SEOSitemapType;
  defaultStatus: SEOSitemapStatus;
  defaultPriority: SEOSitemapPriority;
  defaultFormat: SEOSitemapFormat;
  defaultCompression: SEOSitemapCompression;
  defaultSource: SEOSitemapSource;
  maxUrlCount: number;
  autoGenerate: boolean;
  autoUpdate: boolean;
  autoValidate: boolean;
  requireValidation: boolean;
  requireCompression: boolean;
  maxSitemapsPerSite: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnValidation: boolean;
  notificationOnError: boolean;
  alertConfig?: SEOSitemapAlertConfig;
}

/**
 * SEO sitemap alert configuration
 */
export interface SEOSitemapAlertConfig {
  enabled: boolean;
  validationFailureAlert: boolean;
  sizeExceededAlert: boolean;
  urlCountAlert: boolean;
  generationErrorAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  urlCountThreshold: number;
  sizeThreshold: number;
}

/**
 * SEO sitemap history
 */
export interface SEOSitemapHistory extends BaseEntity, Timestamp {
  id: ID;
  sitemapId: ID;
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
    | 'url_add'
    | 'url_remove'
    | 'url_update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * SEO sitemap validation (নাম পরিবর্তন করা হয়েছে)
 */
export interface SEOSitemapValidation {
  isValid: boolean;
  sitemapId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * SEO sitemap export
 */
export interface SEOSitemapExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx' | 'xml';
  filter: SEOSitemapFilter;
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
  // SEO Sitemap Main
  SEO_SITEMAP,
  SEOSitemapStatus,
  SEOSitemapPriority,
  SEOSitemapChangeFrequency,
  SEOSitemapFormat,
  SEOSitemapSize,
  SEOSitemapProtocol,
  SEOSitemapCompression,
  SEOSitemapErrorType,
  SEOSitemapMetric,
  SEOSitemapSource,
  getSEOSitemapTypeLabel,
  getSEOSitemapStatusLabel,
  getSEOSitemapPriorityLabel,
  getSEOSitemapChangeFrequencyLabel,
  getSEOSitemapFormatLabel,
  getSEOSitemapCompressionLabel,
  getSEOSitemapValidationMainLabel,
  getSEOSitemapErrorLabel,
  getSEOSitemapSourceLabel,
  getSitemapStatusColor,
  isSitemapValid,
  isSitemapActive,
  getPriorityValue,
  // SEO Sitemap Type
  SEO_SITEMAP_TYPE,
  SEOSitemapTypeCategory,
  SEOSitemapTypeSubType,
  SEOSitemapTypeGenerator,
  SEOSitemapTypeScope,
  SEOSitemapTypeStructure,
  SEOSitemapTypeAudience,
  getSEOSitemapCategoryLabel,
  getSEOSitemapSubTypeLabel,
  getSEOSitemapGeneratorLabel,
  getSEOSitemapScopeLabel,
  getSEOSitemapStructureLabel,
  getSEOSitemapAudienceLabel,
  // SEO Sitemap Status
  SEO_SITEMAP_STATUS,
  SEOSitemapLifecycleStatus,
  SEOSitemapHealthStatus,
  SEOSitemapQualityStatus,
  SEOSitemapValidationStatus,
  SEOSitemapIndexingStatus,
  SEOSitemapStatusCategory,
  getSEOSitemapLifecycleLabel,
  getSEOSitemapHealthLabel,
  getSEOSitemapQualityLabel,
  getSEOSitemapValidationStatusLabel,
  getSEOSitemapIndexingLabel,
  getSEOSitemapStatusCategory,
  getSEOSitemapStatusColor,
  isSitemapLifecycleValid,
  isSitemapProcessing,
};
