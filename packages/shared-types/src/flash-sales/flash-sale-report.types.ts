/**
 * Flash Sale Report Types
 * Type definitions for flash sale reports based on shared-constants
 * @module FlashSaleReportTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants reporting report-flash-sales
// ============================================================
import {
  // Flash Sale Report Core
  FLASH_SALE_REPORT,
  FlashSaleReportType,
  FlashSaleReportFormat,
  FlashSaleReportSection,
  FlashSaleReportDelivery,
  FlashSaleReportScheduling,
  flashsalesReportGetTypeLabel,
  flashsalesReportGetFormatLabel,
  flashsalesReportGetSectionLabel,
  flashsalesReportGetDeliveryLabel,
  flashsalesReportGetSchedulingLabel,
  flashsalesReportIsValidType,
  flashsalesReportIsValidFormat,
  flashsalesReportGetDefaultType,
  flashsalesReportGetDefaultFormat,
  flashsalesReportGetDefaultDelivery,
  flashsalesReportGetMaxRows,
  flashsalesReportGetMaxFileSizeMB,
  flashsalesReportGetFileExtension,
  flashsalesReportGetMimeType,
  // Flash Sale Report Type
  FLASH_SALE_REPORT_TYPE,
  FlashSaleReportTypeCategory,
  FlashSaleReportTypeComplexity,
  FlashSaleReportTypeScope,
  FlashSaleReportTypeFrequency,
  FlashSaleReportTypePriority,
  FlashSaleReportTypeStatus,
  FlashSaleReportTypeAudience,
  flashsalesReportTypeGetCategoryLabel,
  flashsalesReportTypeGetComplexityLabel,
  flashsalesReportTypeGetScopeLabel,
  flashsalesReportTypeGetFrequencyLabel,
  flashsalesReportTypeGetPriorityLabel,
  flashsalesReportTypeGetStatusLabel,
  flashsalesReportTypeGetAudienceLabel,
  flashsalesReportTypeIsValidCategory,
  flashsalesReportTypeIsValidStatus,
  flashsalesReportTypeIsGenerated,
  flashsalesReportTypeIsFailed,
  flashsalesReportTypeIsComplete,
} from '@vubon/shared-constants';

// ============================================================
// Flash Sale Report Extended Types
// ============================================================

/**
 * Flash Sale Report
 */
export interface FlashSaleReport extends BaseEntity, Timestamp {
  id: ID;
  flashSaleId: ID;
  type: FlashSaleReportType;
  format: FlashSaleReportFormat;
  sections: FlashSaleReportSection[];
  delivery: FlashSaleReportDelivery;
  scheduling: FlashSaleReportScheduling;
  title: string;
  description?: string;
  fileUrl?: string;
  fileSize?: number;
  rowCount: number;
  isGenerated: boolean;
  isComplete: boolean;
  isFailed: boolean;
  generatedAt?: Date;
  deliveredAt?: Date;
  metadata?: Metadata;
}

/**
 * Flash Sale Report Filter
 */
export interface FlashSaleReportFilter {
  ids?: ID[];
  flashSaleIds?: ID[];
  types?: FlashSaleReportType[];
  formats?: FlashSaleReportFormat[];
  deliveries?: FlashSaleReportDelivery[];
  schedulings?: FlashSaleReportScheduling[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isGenerated?: boolean;
  isComplete?: boolean;
  isFailed?: boolean;
  searchTerm?: string;
}

/**
 * Flash Sale Report Statistics
 */
export interface FlashSaleReportStatistics {
  flashSaleId: ID;
  totalReports: number;
  generatedReports: number;
  completeReports: number;
  failedReports: number;
  byType: Record<FlashSaleReportType, number>;
  byFormat: Record<FlashSaleReportFormat, number>;
  byDelivery: Record<FlashSaleReportDelivery, number>;
  byScheduling: Record<FlashSaleReportScheduling, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageRows: number;
  maxRows: number;
  minRows: number;
  averageFileSize: number;
  maxFileSize: number;
  minFileSize: number;
  mostFrequentType: FlashSaleReportType;
  mostFrequentFormat: FlashSaleReportFormat;
  mostFrequentDelivery: FlashSaleReportDelivery;
}

/**
 * Flash Sale Report Summary
 */
export interface FlashSaleReportSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalReports: number;
  generated: number;
  complete: number;
  failed: number;
  byType: Record<FlashSaleReportType, number>;
  byFormat: Record<FlashSaleReportFormat, number>;
  byDelivery: Record<FlashSaleReportDelivery, number>;
  byScheduling: Record<FlashSaleReportScheduling, number>;
  reportTrend: {
    date: Date;
    total: number;
    generated: number;
    complete: number;
  }[];
  topTypes: {
    type: FlashSaleReportType;
    count: number;
    label: string;
  }[];
  topFormats: {
    format: FlashSaleReportFormat;
    count: number;
    label: string;
  }[];
  topDeliveries: {
    delivery: FlashSaleReportDelivery;
    count: number;
    label: string;
  }[];
}

/**
 * Flash Sale Report Configuration
 */
export interface FlashSaleReportConfiguration {
  enabled: boolean;
  defaultType: FlashSaleReportType;
  defaultFormat: FlashSaleReportFormat;
  defaultDelivery: FlashSaleReportDelivery;
  defaultScheduling: FlashSaleReportScheduling;
  maxRows: number;
  maxFileSizeMB: number;
  autoGenerate: boolean;
  autoDeliver: boolean;
  requireApproval: boolean;
  notificationOnGenerate: boolean;
  notificationOnComplete: boolean;
  notificationOnFailed: boolean;
  notificationOnDeliver: boolean;
  alertConfig?: FlashSaleReportAlertConfig;
}

/**
 * Flash Sale Report Alert Configuration
 */
export interface FlashSaleReportAlertConfig {
  enabled: boolean;
  generationFailureAlert: boolean;
  deliveryFailureAlert: boolean;
  sizeLimitAlert: boolean;
  rowLimitAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Flash Sale Report History
 */
export interface FlashSaleReportHistory extends BaseEntity, Timestamp {
  id: ID;
  reportId: ID;
  flashSaleId: ID;
  action: 'create' | 'generate' | 'complete' | 'fail' | 'deliver' | 'update' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Flash Sale Report Validation
 */
export interface FlashSaleReportValidation {
  isValid: boolean;
  reportId: ID;
  flashSaleId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Flash Sale Report Export
 */
export interface FlashSaleReportExport extends BaseEntity, Timestamp {
  id: ID;
  flashSaleId: ID;
  format: FlashSaleReportFormat;
  filter: FlashSaleReportFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Flash Sale Report Section
 */
export interface FlashSaleReportSectionDetail extends BaseEntity, Timestamp {
  id: ID;
  reportId: ID;
  section: FlashSaleReportSection;
  title: string;
  content: string;
  order: number;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Flash Sale Report Core
  FLASH_SALE_REPORT,
  FlashSaleReportType,
  FlashSaleReportFormat,
  FlashSaleReportSection,
  FlashSaleReportDelivery,
  FlashSaleReportScheduling,
  flashsalesReportGetTypeLabel,
  flashsalesReportGetFormatLabel,
  flashsalesReportGetSectionLabel,
  flashsalesReportGetDeliveryLabel,
  flashsalesReportGetSchedulingLabel,
  flashsalesReportIsValidType,
  flashsalesReportIsValidFormat,
  flashsalesReportGetDefaultType,
  flashsalesReportGetDefaultFormat,
  flashsalesReportGetDefaultDelivery,
  flashsalesReportGetMaxRows,
  flashsalesReportGetMaxFileSizeMB,
  flashsalesReportGetFileExtension,
  flashsalesReportGetMimeType,
  // Flash Sale Report Type
  FLASH_SALE_REPORT_TYPE,
  FlashSaleReportTypeCategory,
  FlashSaleReportTypeComplexity,
  FlashSaleReportTypeScope,
  FlashSaleReportTypeFrequency,
  FlashSaleReportTypePriority,
  FlashSaleReportTypeStatus,
  FlashSaleReportTypeAudience,
  flashsalesReportTypeGetCategoryLabel,
  flashsalesReportTypeGetComplexityLabel,
  flashsalesReportTypeGetScopeLabel,
  flashsalesReportTypeGetFrequencyLabel,
  flashsalesReportTypeGetPriorityLabel,
  flashsalesReportTypeGetStatusLabel,
  flashsalesReportTypeGetAudienceLabel,
  flashsalesReportTypeIsValidCategory,
  flashsalesReportTypeIsValidStatus,
  flashsalesReportTypeIsGenerated,
  flashsalesReportTypeIsFailed,
  flashsalesReportTypeIsComplete,
};
