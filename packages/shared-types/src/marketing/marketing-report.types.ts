/**
 * Marketing Report Types
 * Type definitions for marketing reports based on shared-constants
 * @module MarketingReportTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants marketing report
// ============================================================
import {
  // Marketing Report Core
  MARKETINGREPORT,
  MarketingReportType,
  MarketingReportCategory,
  MarketingReportFrequency,
  MarketingReportFormat,
  MarketingReportPriority,
  MarketingReportStatus,
  MarketingReportDeliveryMethod,
  MarketingReportAggregation,
  MarketingReportVisualization,
  MarketingReportDefault,
  MarketingReportLimit,
  marketingReportGetTypeLabel,
  marketingReportGetCategoryLabel,
  marketingReportGetFrequencyLabel,
  marketingReportGetFormatLabel,
  marketingReportGetPriorityLabel,
  marketingReportGetStatusLabel,
  marketingReportGetDeliveryMethodLabel,
  marketingReportGetAggregationLabel,
  marketingReportGetVisualizationLabel,
  marketingReportGetDefaultFormat,
  marketingReportGetDefaultTimezone,
  marketingReportGetDefaultPageSize,
  marketingReportIsExecutiveReport,
  marketingReportIsStrategicReport,
  marketingReportIsTacticalReport,
  marketingReportIsCompleted,
  marketingReportIsPending,
  marketingReportIsActive,
  marketingReportCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Marketing Report Extended Types
// ============================================================

/**
 * Marketing Report
 */
export interface MarketingReport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  name: string;
  description?: string;
  type: MarketingReportType;
  category: MarketingReportCategory;
  frequency: MarketingReportFrequency;
  format: MarketingReportFormat;
  priority: MarketingReportPriority;
  status: MarketingReportStatus;
  deliveryMethod: MarketingReportDeliveryMethod;
  aggregation: MarketingReportAggregation;
  visualization: MarketingReportVisualization;
  timezone: string;
  pageSize: number;
  isExecutive: boolean;
  isStrategic: boolean;
  isTactical: boolean;
  isCompleted: boolean;
  isPending: boolean;
  isActive: boolean;
  generatedAt?: Date;
  deliveredAt?: Date;
  metadata?: Metadata;
}

/**
 * Marketing Report Filter
 */
export interface MarketingReportFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: MarketingReportType[];
  categories?: MarketingReportCategory[];
  frequencies?: MarketingReportFrequency[];
  formats?: MarketingReportFormat[];
  priorities?: MarketingReportPriority[];
  statuses?: MarketingReportStatus[];
  deliveryMethods?: MarketingReportDeliveryMethod[];
  aggregations?: MarketingReportAggregation[];
  visualizations?: MarketingReportVisualization[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isExecutive?: boolean;
  isStrategic?: boolean;
  isTactical?: boolean;
  isCompleted?: boolean;
  isPending?: boolean;
  isActive?: boolean;
  searchTerm?: string;
}

/**
 * Marketing Report Statistics
 */
export interface MarketingReportStatistics {
  userId: ID;
  totalReports: number;
  completedReports: number;
  pendingReports: number;
  activeReports: number;
  byType: Record<MarketingReportType, number>;
  byCategory: Record<MarketingReportCategory, number>;
  byFrequency: Record<MarketingReportFrequency, number>;
  byFormat: Record<MarketingReportFormat, number>;
  byPriority: Record<MarketingReportPriority, number>;
  byStatus: Record<MarketingReportStatus, number>;
  byDeliveryMethod: Record<MarketingReportDeliveryMethod, number>;
  byAggregation: Record<MarketingReportAggregation, number>;
  byVisualization: Record<MarketingReportVisualization, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  executiveReports: number;
  strategicReports: number;
  tacticalReports: number;
  mostFrequentType: MarketingReportType;
  mostFrequentCategory: MarketingReportCategory;
  mostFrequentFrequency: MarketingReportFrequency;
  mostFrequentStatus: MarketingReportStatus;
}

/**
 * Marketing Report Summary
 */
export interface MarketingReportSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalReports: number;
  completed: number;
  pending: number;
  active: number;
  byType: Record<MarketingReportType, number>;
  byCategory: Record<MarketingReportCategory, number>;
  byFrequency: Record<MarketingReportFrequency, number>;
  byFormat: Record<MarketingReportFormat, number>;
  byPriority: Record<MarketingReportPriority, number>;
  byStatus: Record<MarketingReportStatus, number>;
  byDeliveryMethod: Record<MarketingReportDeliveryMethod, number>;
  byAggregation: Record<MarketingReportAggregation, number>;
  byVisualization: Record<MarketingReportVisualization, number>;
  reportTrend: {
    date: Date;
    total: number;
    completed: number;
    pending: number;
  }[];
  topTypes: {
    type: MarketingReportType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: MarketingReportCategory;
    count: number;
    label: string;
  }[];
  topFrequencies: {
    frequency: MarketingReportFrequency;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: MarketingReportStatus;
    count: number;
    label: string;
  }[];
}

/**
 * Marketing Report Configuration
 */
export interface MarketingReportConfiguration {
  enabled: boolean;
  defaultType: MarketingReportType;
  defaultCategory: MarketingReportCategory;
  defaultFrequency: MarketingReportFrequency;
  defaultFormat: MarketingReportFormat;
  defaultPriority: MarketingReportPriority;
  defaultStatus: MarketingReportStatus;
  defaultDeliveryMethod: MarketingReportDeliveryMethod;
  defaultAggregation: MarketingReportAggregation;
  defaultVisualization: MarketingReportVisualization;
  defaultTimezone: string;
  defaultPageSize: number;
  maxReportsPerUser: number;
  maxReportsPerDay: number;
  allowScheduling: boolean;
  allowExport: boolean;
  allowSharing: boolean;
  requireApproval: boolean;
  autoGenerate: boolean;
  autoDeliver: boolean;
  notificationOnCreate: boolean;
  notificationOnGenerate: boolean;
  notificationOnDeliver: boolean;
  notificationOnDelete: boolean;
  alertConfig?: MarketingReportAlertConfig;
}

/**
 * Marketing Report Alert Configuration
 */
export interface MarketingReportAlertConfig {
  enabled: boolean;
  generationFailureAlert: boolean;
  deliveryFailureAlert: boolean;
  pendingAlert: boolean;
  pendingThreshold: number;
  performanceAlert: boolean;
  performanceThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Marketing Report History
 */
export interface MarketingReportHistory extends BaseEntity, Timestamp {
  id: ID;
  reportId: ID;
  userId: ID;
  action: 'create' | 'update' | 'generate' | 'deliver' | 'archive' | 'restore' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Marketing Report Validation
 */
export interface MarketingReportValidation {
  isValid: boolean;
  reportId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Marketing Report Export
 */
export interface MarketingReportExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx' | 'html';
  filter: MarketingReportFilter;
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
  // Marketing Report Core
  MARKETINGREPORT,
  MarketingReportType,
  MarketingReportCategory,
  MarketingReportFrequency,
  MarketingReportFormat,
  MarketingReportPriority,
  MarketingReportStatus,
  MarketingReportDeliveryMethod,
  MarketingReportAggregation,
  MarketingReportVisualization,
  MarketingReportDefault,
  MarketingReportLimit,
  marketingReportGetTypeLabel,
  marketingReportGetCategoryLabel,
  marketingReportGetFrequencyLabel,
  marketingReportGetFormatLabel,
  marketingReportGetPriorityLabel,
  marketingReportGetStatusLabel,
  marketingReportGetDeliveryMethodLabel,
  marketingReportGetAggregationLabel,
  marketingReportGetVisualizationLabel,
  marketingReportGetDefaultFormat,
  marketingReportGetDefaultTimezone,
  marketingReportGetDefaultPageSize,
  marketingReportIsExecutiveReport,
  marketingReportIsStrategicReport,
  marketingReportIsTacticalReport,
  marketingReportIsCompleted,
  marketingReportIsPending,
  marketingReportIsActive,
  marketingReportCanTransition,
};
