/**
 * Deal Report Types
 * Type definitions for deal reports based on shared-constants
 * @module DealReportTypes
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
// Deal Report Extended Types
// ============================================================

/**
 * Deal Report
 */
export interface DealReport extends BaseEntity, Timestamp {
  id: ID;
  dealId: ID;
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
 * Deal Report Filter
 */
export interface DealReportFilter {
  ids?: ID[];
  dealIds?: ID[];
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
 * Deal Report Statistics
 */
export interface DealReportStatistics {
  dealId: ID;
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
 * Deal Report Summary
 */
export interface DealReportSummary {
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
 * Deal Report Configuration
 */
export interface DealReportConfiguration {
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
  alertConfig?: DealReportAlertConfig;
}

/**
 * Deal Report Alert Configuration
 */
export interface DealReportAlertConfig {
  enabled: boolean;
  generationFailureAlert: boolean;
  deliveryFailureAlert: boolean;
  sizeLimitAlert: boolean;
  rowLimitAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Deal Report History
 */
export interface DealReportHistory extends BaseEntity, Timestamp {
  id: ID;
  reportId: ID;
  dealId: ID;
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
 * Deal Report Validation
 */
export interface DealReportValidation {
  isValid: boolean;
  reportId: ID;
  dealId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Deal Report Export
 */
export interface DealReportExport extends BaseEntity, Timestamp {
  id: ID;
  dealId: ID;
  format: FlashSaleReportFormat;
  filter: DealReportFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Deal Report Section
 */
export interface DealReportSectionDetail extends BaseEntity, Timestamp {
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
