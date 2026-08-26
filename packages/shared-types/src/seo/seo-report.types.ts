/**
 * SEO Report Types
 * Type definitions for SEO reports based on shared-constants
 * @module SEOReportTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants seo report
// ============================================================
import {
  // SEO Report Main
  SEO_REPORT,
  SEOReportType,
  SEOReportStatus,
  SEOReportFormat,
  SEOReportFrequency,
  SEOReportPriority,
  SEOReportDelivery,
  SEOReportSection,
  SEOReportErrorType,
  SEOReportMetric,
  getSEOReportTypeLabel,
  getSEOReportStatusLabel,
  getSEOReportFormatLabel,
  getSEOReportFrequencyLabel,
  getSEOReportPriorityLabel,
  getSEOReportDeliveryLabel,
  getSEOReportSectionLabel,
  getSEOReportErrorLabel,
  seoReportGetStatusColor,
  isSEOReportComplete,
  isSEOReportProcessing,
  // SEO Report Type
  SEO_REPORT_TYPE,
  SEOReportTypeCategory,
  SEOReportTypeSubType,
  SEOReportTypeScope,
  SEOReportTypeGranularity,
  SEOReportTypeAudience,
  SEOReportTypePurpose,
  getSEOReportCategoryLabel,
  getSEOReportSubTypeLabel,
  getSEOReportScopeLabel,
  getSEOReportGranularityLabel,
  getSEOReportAudienceLabel,
  getSEOReportPurposeLabel,
  // SEO Report Status
  SEO_REPORT_STATUS,
  SEOReportLifecycleStatus,
  SEOReportHealthStatus,
  SEOReportQualityStatus,
  SEOReportDeliveryStatus,
  SEOReportValidationStatus,
  SEOReportStatusCategory,
  getSEOReportLifecycleLabel,
  getSEOReportHealthLabel,
  getSEOReportQualityLabel,
  getSEOReportDeliveryStatusLabel,
  getSEOReportValidationLabel,
  getSEOReportStatusCategory,
  getSEOReportStatusColor,
  isSEOReportGenerated,
  isSEOReportLifecycleProcessing,
} from '@vubon/shared-constants';

// ============================================================
// SEO Report Extended Types
// ============================================================

/**
 * SEO report
 */
export interface SEOReport extends BaseEntity, Timestamp {
  id: ID;
  title: string;
  description?: string;
  type: SEOReportType;
  status: SEOReportStatus;
  format: SEOReportFormat;
  frequency: SEOReportFrequency;
  priority: SEOReportPriority;
  delivery: SEOReportDelivery;
  sections: SEOReportSection[];
  metrics: SEOReportMetric[];
  data: Record<string, unknown>;
  isComplete: boolean;
  isProcessing: boolean;
  generatedAt?: Date;
  deliveredAt?: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * SEO report filter
 */
export interface SEOReportFilter {
  ids?: ID[];
  titles?: string[];
  types?: SEOReportType[];
  statuses?: SEOReportStatus[];
  formats?: SEOReportFormat[];
  frequencies?: SEOReportFrequency[];
  priorities?: SEOReportPriority[];
  deliveries?: SEOReportDelivery[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isComplete?: boolean;
  isProcessing?: boolean;
  searchTerm?: string;
}

/**
 * SEO report statistics
 */
export interface SEOReportStatistics {
  totalReports: number;
  completeReports: number;
  processingReports: number;
  byType: Record<SEOReportType, number>;
  byStatus: Record<SEOReportStatus, number>;
  byFormat: Record<SEOReportFormat, number>;
  byFrequency: Record<SEOReportFrequency, number>;
  byPriority: Record<SEOReportPriority, number>;
  byDelivery: Record<SEOReportDelivery, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  mostFrequentType: SEOReportType;
  mostFrequentStatus: SEOReportStatus;
  mostFrequentFormat: SEOReportFormat;
  mostFrequentFrequency: SEOReportFrequency;
  totalMetrics: number;
  averageMetrics: number;
}

/**
 * SEO report summary
 */
export interface SEOReportSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalReports: number;
  complete: number;
  processing: number;
  byType: Record<SEOReportType, number>;
  byStatus: Record<SEOReportStatus, number>;
  byFormat: Record<SEOReportFormat, number>;
  byFrequency: Record<SEOReportFrequency, number>;
  byPriority: Record<SEOReportPriority, number>;
  byDelivery: Record<SEOReportDelivery, number>;
  reportTrend: {
    date: Date;
    total: number;
    complete: number;
    processing: number;
  }[];
  topTypes: {
    type: SEOReportType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: SEOReportStatus;
    count: number;
    label: string;
  }[];
  topFormats: {
    format: SEOReportFormat;
    count: number;
    label: string;
  }[];
  topFrequencies: {
    frequency: SEOReportFrequency;
    count: number;
    label: string;
  }[];
  metricSummary: {
    total: number;
    average: number;
    max: number;
    min: number;
  };
}

/**
 * SEO report configuration
 */
export interface SEOReportConfiguration {
  enabled: boolean;
  defaultType: SEOReportType;
  defaultStatus: SEOReportStatus;
  defaultFormat: SEOReportFormat;
  defaultFrequency: SEOReportFrequency;
  defaultPriority: SEOReportPriority;
  defaultDelivery: SEOReportDelivery;
  autoGenerate: boolean;
  autoDeliver: boolean;
  requireSections: boolean;
  requireMetrics: boolean;
  maxReportsPerProject: number;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnComplete: boolean;
  notificationOnDelivery: boolean;
  notificationOnError: boolean;
  alertConfig?: SEOReportAlertConfig;
}

/**
 * SEO report alert configuration
 */
export interface SEOReportAlertConfig {
  enabled: boolean;
  generationFailureAlert: boolean;
  deliveryFailureAlert: boolean;
  dataQualityAlert: boolean;
  scheduleMissAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * SEO report history
 */
export interface SEOReportHistory extends BaseEntity, Timestamp {
  id: ID;
  reportId: ID;
  action:
    | 'create'
    | 'update'
    | 'generate'
    | 'deliver'
    | 'complete'
    | 'fail'
    | 'activate'
    | 'deactivate'
    | 'delete'
    | 'restore'
    | 'section_add'
    | 'section_remove'
    | 'section_update'
    | 'metric_add'
    | 'metric_remove'
    | 'metric_update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * SEO report validation
 */
export interface SEOReportValidation {
  isValid: boolean;
  reportId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * SEO report section detail
 */
export interface SEOReportSectionDetail extends BaseEntity, Timestamp {
  id: ID;
  reportId: ID;
  section: SEOReportSection;
  title: string;
  content: string;
  order: number;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * SEO report export
 */
export interface SEOReportExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx' | 'html' | 'docx';
  filter: SEOReportFilter;
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
  // SEO Report Main
  SEO_REPORT,
  SEOReportType,
  SEOReportStatus,
  SEOReportFormat,
  SEOReportFrequency,
  SEOReportPriority,
  SEOReportDelivery,
  SEOReportSection,
  SEOReportErrorType,
  SEOReportMetric,
  getSEOReportTypeLabel,
  getSEOReportStatusLabel,
  getSEOReportFormatLabel,
  getSEOReportFrequencyLabel,
  getSEOReportPriorityLabel,
  getSEOReportDeliveryLabel,
  getSEOReportSectionLabel,
  getSEOReportErrorLabel,
  seoReportGetStatusColor,
  isSEOReportComplete,
  isSEOReportProcessing,
  // SEO Report Type
  SEO_REPORT_TYPE,
  SEOReportTypeCategory,
  SEOReportTypeSubType,
  SEOReportTypeScope,
  SEOReportTypeGranularity,
  SEOReportTypeAudience,
  SEOReportTypePurpose,
  getSEOReportCategoryLabel,
  getSEOReportSubTypeLabel,
  getSEOReportScopeLabel,
  getSEOReportGranularityLabel,
  getSEOReportAudienceLabel,
  getSEOReportPurposeLabel,
  // SEO Report Status
  SEO_REPORT_STATUS,
  SEOReportLifecycleStatus,
  SEOReportHealthStatus,
  SEOReportQualityStatus,
  SEOReportDeliveryStatus,
  SEOReportValidationStatus,
  SEOReportStatusCategory,
  getSEOReportLifecycleLabel,
  getSEOReportHealthLabel,
  getSEOReportQualityLabel,
  getSEOReportDeliveryStatusLabel,
  getSEOReportValidationLabel,
  getSEOReportStatusCategory,
  getSEOReportStatusColor,
  isSEOReportGenerated,
  isSEOReportLifecycleProcessing,
};
