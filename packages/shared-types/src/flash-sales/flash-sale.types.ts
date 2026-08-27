/**
 * Flash Sale Types
 * Type definitions for flash sales based on shared-constants
 * @module FlashSaleTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Currency } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants flash-sales
// ============================================================
import {
  // Flash Sale Core
  FLASH_SALE,
  FlashSaleType,
  FlashSaleStatus,
  FlashSalePriority,
  FlashSaleTimeframe,
  FlashSaleFrequency,
  FlashSaleVisibility,
  FlashSaleFeature,
  FlashSaleCondition,
  flashSaleGetTypeLabel,
  flashSaleGetStatusLabel,
  flashSaleGetPriorityLabel,
  flashSaleGetTimeframeLabel,
  flashSaleGetFrequencyLabel,
  flashSaleGetVisibilityLabel,
  flashSaleGetFeatureLabel,
  flashSaleGetConditionLabel,
  flashSaleIsValidType,
  flashSaleIsValidStatus,
  flashSaleIsValidPriority,
  flashSaleIsActive,
  flashSaleIsScheduled,
  flashSaleIsComplete,
  flashSaleGetTimeframeMinutes,
  flashSaleGetDefaultDuration,
  flashSaleGetMaxProducts,
  flashSaleGetMaxDiscount,
  // Flash Sale Status
  FLASH_SALE_STATUS,
  FlashSaleStatusType,
  FlashSaleStatusCategory,
  FlashSaleStatusColor,
  FlashSaleStatusPriority,
  flashSaleStatusGetLabel,
  flashSaleStatusGetCategory,
  flashSaleStatusGetColor,
  flashSaleStatusGetPriority,
  flashSaleStatusIsActive,
  flashSaleStatusIsScheduled,
  flashSaleStatusIsComplete,
  flashSaleStatusCanTransitionTo,
  flashSaleStatusGetAvailableTransitions,
  flashSaleStatusCanStart,
  flashSaleStatusCanPause,
  flashSaleStatusCanResume,
  flashSaleStatusCanEnd,
  flashSaleStatusCanCancel,
  flashSaleStatusIsValid,
  // Flash Sale Type
  FLASH_SALE_TYPE,
  FlashSaleTypeCategory,
  FlashSaleTypeComplexity,
  FlashSaleTypeScope,
  FlashSaleTypeAudience,
  FlashSaleTypeChannel,
  FlashSaleTypeTrigger,
  FlashSaleTypeEngagement,
  FlashSaleTypePerformance,
  flashSaleTypeGetCategoryLabel,
  flashSaleTypeGetComplexityLabel,
  flashSaleTypeGetScopeLabel,
  flashSaleTypeGetAudienceLabel,
  flashSaleTypeGetChannelLabel,
  flashSaleTypeGetTriggerLabel,
  flashSaleTypeGetEngagementLabel,
  flashSaleTypeGetPerformanceLabel,
  flashSaleTypeIsValidCategory,
  flashSaleTypeIsValidAudience,
  // Flash Sale Priority
  FLASH_SALE_PRIORITY,
  FlashSalePriorityLevel,
  FlashSalePriorityScore,
  FlashSalePriorityColor,
  FlashSalePrioritySLATarget,
  FlashSalePriorityResourceAllocation,
  FlashSalePriorityWeight,
  FlashSalePriorityEscalation,
  flashSalePriorityGetLevelLabel,
  flashSalePriorityGetScore,
  flashSalePriorityGetColor,
  flashSalePriorityGetSLATarget,
  flashSalePriorityGetResourceAllocation,
  flashSalePriorityGetWeight,
  flashSalePriorityGetEscalation,
  flashSalePriorityIsUrgent,
  flashSalePriorityIsHigh,
  flashSalePriorityIsLow,
  flashSalePriorityIsValid,
  flashSalePriorityGetPriorityFromScore,
  // Flash Sale Error
  FLASH_SALE_ERROR,
  FlashSaleErrorCategory,
  FlashSaleErrorCode,
  FlashSaleErrorSeverity,
  FlashSaleErrorRetry,
  flashsalesErrorGetMessage,
  flashsalesErrorGetHttpStatus,
  flashsalesErrorGetCategory,
  flashsalesErrorGetSeverity,
  flashsalesErrorGetRetryType,
  flashsalesErrorIsRetryable,
  flashsalesErrorIsCritical,
  flashsalesErrorIsClientError,
  flashsalesErrorIsServerError,
} from '@vubon/shared-constants';

// ============================================================
// Flash Sale Extended Types
// ============================================================

/**
 * Flash Sale
 */
export interface FlashSale extends BaseEntity, Timestamp {
  id: ID;
  name: string;
  description?: string;
  type: FlashSaleType;
  status: FlashSaleStatus;
  priority: FlashSalePriority;
  timeframe: FlashSaleTimeframe;
  frequency: FlashSaleFrequency;
  visibility: FlashSaleVisibility;
  feature: FlashSaleFeature;
  condition: FlashSaleCondition;
  startDate: Date;
  endDate: Date;
  discount: number;
  maxDiscount: number;
  maxProducts: number;
  currency: Currency;
  isActive: boolean;
  isScheduled: boolean;
  isComplete: boolean;
  metadata?: Metadata;
}

/**
 * Flash Sale Filter
 */
export interface FlashSaleFilter {
  ids?: ID[];
  types?: FlashSaleType[];
  statuses?: FlashSaleStatus[];
  priorities?: FlashSalePriority[];
  timeframes?: FlashSaleTimeframe[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isScheduled?: boolean;
  isComplete?: boolean;
  minDiscount?: number;
  maxDiscount?: number;
  searchTerm?: string;
}

/**
 * Flash Sale Statistics
 */
export interface FlashSaleStatistics {
  totalFlashSales: number;
  activeFlashSales: number;
  scheduledFlashSales: number;
  completedFlashSales: number;
  byType: Record<FlashSaleType, number>;
  byStatus: Record<FlashSaleStatus, number>;
  byPriority: Record<FlashSalePriority, number>;
  byTimeframe: Record<FlashSaleTimeframe, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageDiscount: number;
  maxDiscount: number;
  minDiscount: number;
  averageDuration: number;
  maxDuration: number;
  minDuration: number;
  mostFrequentType: FlashSaleType;
  mostFrequentStatus: FlashSaleStatus;
  mostFrequentPriority: FlashSalePriority;
}

/**
 * Flash Sale Summary
 */
export interface FlashSaleSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  scheduled: number;
  complete: number;
  byType: Record<FlashSaleType, number>;
  byStatus: Record<FlashSaleStatus, number>;
  byPriority: Record<FlashSalePriority, number>;
  byTimeframe: Record<FlashSaleTimeframe, number>;
  flashSaleTrend: {
    date: Date;
    total: number;
    active: number;
    complete: number;
  }[];
  topTypes: {
    type: FlashSaleType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: FlashSaleStatus;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: FlashSalePriority;
    count: number;
    label: string;
  }[];
}

/**
 * Flash Sale Configuration
 */
export interface FlashSaleConfiguration {
  enabled: boolean;
  defaultType: FlashSaleType;
  defaultStatus: FlashSaleStatus;
  defaultPriority: FlashSalePriority;
  defaultTimeframe: FlashSaleTimeframe;
  defaultFrequency: FlashSaleFrequency;
  defaultVisibility: FlashSaleVisibility;
  defaultDuration: number;
  maxDiscount: number;
  maxProducts: number;
  maxFlashSalesPerDay: number;
  requireApproval: boolean;
  autoPublish: boolean;
  notificationOnCreate: boolean;
  notificationOnStart: boolean;
  notificationOnComplete: boolean;
  notificationOnCancel: boolean;
  alertConfig?: FlashSaleAlertConfig;
}

/**
 * Flash Sale Alert Configuration
 */
export interface FlashSaleAlertConfig {
  enabled: boolean;
  highPriorityAlert: boolean;
  urgentAlert: boolean;
  lowStockAlert: boolean;
  lowStockThreshold: number;
  performanceAlert: boolean;
  performanceThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Flash Sale History
 */
export interface FlashSaleHistory extends BaseEntity, Timestamp {
  id: ID;
  flashSaleId: ID;
  action: 'create' | 'update' | 'start' | 'pause' | 'resume' | 'complete' | 'cancel' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Flash Sale Product
 */
export interface FlashSaleProduct extends BaseEntity, Timestamp {
  id: ID;
  flashSaleId: ID;
  productId: ID;
  variantId?: ID;
  discount: number;
  maxQuantity: number;
  soldQuantity: number;
  remainingQuantity: number;
  price: number;
  salePrice: number;
  metadata?: Metadata;
}

/**
 * Flash Sale Validation
 */
export interface FlashSaleValidation {
  isValid: boolean;
  flashSaleId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Flash Sale Export
 */
export interface FlashSaleExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: FlashSaleFilter;
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
  // Flash Sale Core
  FLASH_SALE,
  FlashSaleType,
  FlashSaleStatus,
  FlashSalePriority,
  FlashSaleTimeframe,
  FlashSaleFrequency,
  FlashSaleVisibility,
  FlashSaleFeature,
  FlashSaleCondition,
  flashSaleGetTypeLabel,
  flashSaleGetStatusLabel,
  flashSaleGetPriorityLabel,
  flashSaleGetTimeframeLabel,
  flashSaleGetFrequencyLabel,
  flashSaleGetVisibilityLabel,
  flashSaleGetFeatureLabel,
  flashSaleGetConditionLabel,
  flashSaleIsValidType,
  flashSaleIsValidStatus,
  flashSaleIsValidPriority,
  flashSaleIsActive,
  flashSaleIsScheduled,
  flashSaleIsComplete,
  flashSaleGetTimeframeMinutes,
  flashSaleGetDefaultDuration,
  flashSaleGetMaxProducts,
  flashSaleGetMaxDiscount,
  // Flash Sale Status
  FLASH_SALE_STATUS,
  FlashSaleStatusType,
  FlashSaleStatusCategory,
  FlashSaleStatusColor,
  FlashSaleStatusPriority,
  flashSaleStatusGetLabel,
  flashSaleStatusGetCategory,
  flashSaleStatusGetColor,
  flashSaleStatusGetPriority,
  flashSaleStatusIsActive,
  flashSaleStatusIsScheduled,
  flashSaleStatusIsComplete,
  flashSaleStatusCanTransitionTo,
  flashSaleStatusGetAvailableTransitions,
  flashSaleStatusCanStart,
  flashSaleStatusCanPause,
  flashSaleStatusCanResume,
  flashSaleStatusCanEnd,
  flashSaleStatusCanCancel,
  flashSaleStatusIsValid,
  // Flash Sale Type
  FLASH_SALE_TYPE,
  FlashSaleTypeCategory,
  FlashSaleTypeComplexity,
  FlashSaleTypeScope,
  FlashSaleTypeAudience,
  FlashSaleTypeChannel,
  FlashSaleTypeTrigger,
  FlashSaleTypeEngagement,
  FlashSaleTypePerformance,
  flashSaleTypeGetCategoryLabel,
  flashSaleTypeGetComplexityLabel,
  flashSaleTypeGetScopeLabel,
  flashSaleTypeGetAudienceLabel,
  flashSaleTypeGetChannelLabel,
  flashSaleTypeGetTriggerLabel,
  flashSaleTypeGetEngagementLabel,
  flashSaleTypeGetPerformanceLabel,
  flashSaleTypeIsValidCategory,
  flashSaleTypeIsValidAudience,
  // Flash Sale Priority
  FLASH_SALE_PRIORITY,
  FlashSalePriorityLevel,
  FlashSalePriorityScore,
  FlashSalePriorityColor,
  FlashSalePrioritySLATarget,
  FlashSalePriorityResourceAllocation,
  FlashSalePriorityWeight,
  FlashSalePriorityEscalation,
  flashSalePriorityGetLevelLabel,
  flashSalePriorityGetScore,
  flashSalePriorityGetColor,
  flashSalePriorityGetSLATarget,
  flashSalePriorityGetResourceAllocation,
  flashSalePriorityGetWeight,
  flashSalePriorityGetEscalation,
  flashSalePriorityIsUrgent,
  flashSalePriorityIsHigh,
  flashSalePriorityIsLow,
  flashSalePriorityIsValid,
  flashSalePriorityGetPriorityFromScore,
  // Flash Sale Error
  FLASH_SALE_ERROR,
  FlashSaleErrorCategory,
  FlashSaleErrorCode,
  FlashSaleErrorSeverity,
  FlashSaleErrorRetry,
  flashsalesErrorGetMessage,
  flashsalesErrorGetHttpStatus,
  flashsalesErrorGetCategory,
  flashsalesErrorGetSeverity,
  flashsalesErrorGetRetryType,
  flashsalesErrorIsRetryable,
  flashsalesErrorIsCritical,
  flashsalesErrorIsClientError,
  flashsalesErrorIsServerError,
};
