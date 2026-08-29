/**
 * Return Reason Types
 * Type definitions for logistics return reasons based on shared-constants
 * @module ReturnReasonTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics return
// ============================================================
import {
  // Return Reason Constants
  LOGISTICS_RETURN_REASON,
  LogisticsReturnReason,
  LogisticsReturnReasonCategory,
  LogisticsReturnReasonType,
  LogisticsReturnReasonSeverity,
  logisticsReturnReasonGetLabel,
  logisticsReturnReasonGetBanglaLabel,
  logisticsReturnReasonGetCategory,
  logisticsReturnReasonGetPriority,
  logisticsReturnReasonIsProductIssue,
  // Return Reason Type Constants
  LOGISTICS_RETURN_REASON_TYPE,
  LogisticsReturnReasonTypeCategory,
  LogisticsReturnReasonTypeIcon,
  LogisticsReturnReasonTypeColor,
  logisticsReturnReasonTypeGetLabel,
  logisticsReturnReasonTypeGetIcon,
  logisticsReturnReasonTypeGetColor,
  logisticsReturnReasonTypeGetComplexity,
  logisticsReturnReasonTypeGetResolutionTime,
  logisticsReturnReasonTypeNeedsApproval,
} from '@vubon/shared-constants';

// ============================================================
// Return Reason Extended Types
// ============================================================

/**
 * Return reason
 */
export interface ReturnReason extends BaseEntity, Timestamp {
  id: ID;
  reason: LogisticsReturnReason;
  category: LogisticsReturnReasonCategory;
  type: LogisticsReturnReasonType;
  severity: LogisticsReturnReasonSeverity;
  label: string;
  banglaLabel: string;
  priority: number;
  isProductIssue: boolean;
  complexity: number;
  resolutionTime: number;
  needsApproval: boolean;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Return reason filter
 */
export interface ReturnReasonFilter {
  ids?: ID[];
  reasons?: LogisticsReturnReason[];
  categories?: LogisticsReturnReasonCategory[];
  types?: LogisticsReturnReasonType[];
  severities?: LogisticsReturnReasonSeverity[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isProductIssue?: boolean;
  needsApproval?: boolean;
  isActive?: boolean;
  minPriority?: number;
  maxPriority?: number;
  minComplexity?: number;
  maxComplexity?: number;
  minResolutionTime?: number;
  maxResolutionTime?: number;
  searchTerm?: string;
}

/**
 * Return reason statistics
 */
export interface ReturnReasonStatistics {
  totalReasons: number;
  activeReasons: number;
  productIssueReasons: number;
  byCategory: Record<LogisticsReturnReasonCategory, number>;
  byType: Record<LogisticsReturnReasonType, number>;
  bySeverity: Record<LogisticsReturnReasonSeverity, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averagePriority: number;
  maxPriority: number;
  minPriority: number;
  averageComplexity: number;
  maxComplexity: number;
  minComplexity: number;
  averageResolutionTime: number;
  maxResolutionTime: number;
  minResolutionTime: number;
  reasonsNeedingApproval: number;
  mostFrequentCategory: LogisticsReturnReasonCategory;
  mostFrequentType: LogisticsReturnReasonType;
  mostFrequentSeverity: LogisticsReturnReasonSeverity;
}

/**
 * Return reason summary
 */
export interface ReturnReasonSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalReasons: number;
  active: number;
  productIssue: number;
  byCategory: Record<LogisticsReturnReasonCategory, number>;
  byType: Record<LogisticsReturnReasonType, number>;
  bySeverity: Record<LogisticsReturnReasonSeverity, number>;
  reasonTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topCategories: {
    category: LogisticsReturnReasonCategory;
    count: number;
    label: string;
  }[];
  topTypes: {
    type: LogisticsReturnReasonType;
    count: number;
    label: string;
  }[];
  topSeverities: {
    severity: LogisticsReturnReasonSeverity;
    count: number;
    label: string;
  }[];
  priorityMetrics: {
    average: number;
    max: number;
    min: number;
  };
  resolutionMetrics: {
    average: number;
    max: number;
    min: number;
  };
}

/**
 * Return reason configuration
 */
export interface ReturnReasonConfiguration {
  enabled: boolean;
  defaultCategory: LogisticsReturnReasonCategory;
  defaultType: LogisticsReturnReasonType;
  defaultSeverity: LogisticsReturnReasonSeverity;
  requireBanglaLabel: boolean;
  requirePriority: boolean;
  maxReasons: number;
  allowCustomReasons: boolean;
  autoApprove: boolean;
  notificationOnCreate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDelete: boolean;
  alertConfig?: ReturnReasonAlertConfig;
}

/**
 * Return reason alert configuration
 */
export interface ReturnReasonAlertConfig {
  enabled: boolean;
  duplicateReasonAlert: boolean;
  inactiveReasonAlert: boolean;
  highPriorityAlert: boolean;
  highPriorityThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Return reason history
 */
export interface ReturnReasonHistory extends BaseEntity, Timestamp {
  id: ID;
  reasonId: ID;
  action: 'create' | 'update' | 'activate' | 'deactivate' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Return reason validation
 */
export interface ReturnReasonValidation {
  isValid: boolean;
  reasonId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Return reason export
 */
export interface ReturnReasonExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: ReturnReasonFilter;
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
  // Return Reason Constants
  LOGISTICS_RETURN_REASON,
  LogisticsReturnReason,
  LogisticsReturnReasonCategory,
  LogisticsReturnReasonType,
  LogisticsReturnReasonSeverity,
  logisticsReturnReasonGetLabel,
  logisticsReturnReasonGetBanglaLabel,
  logisticsReturnReasonGetCategory,
  logisticsReturnReasonGetPriority,
  logisticsReturnReasonIsProductIssue,
  // Return Reason Type Constants
  LOGISTICS_RETURN_REASON_TYPE,
  LogisticsReturnReasonTypeCategory,
  LogisticsReturnReasonTypeIcon,
  LogisticsReturnReasonTypeColor,
  logisticsReturnReasonTypeGetLabel,
  logisticsReturnReasonTypeGetIcon,
  logisticsReturnReasonTypeGetColor,
  logisticsReturnReasonTypeGetComplexity,
  logisticsReturnReasonTypeGetResolutionTime,
  logisticsReturnReasonTypeNeedsApproval,
};
