/**
 * Retention Analytics Types
 * Type definitions for retention analytics based on shared-constants
 * @module RetentionAnalyticsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants retention analytics
// ============================================================
import {
  // Retention Analytics Constants
  RETENTION_ANALYTICS,
  RetentionAnalyticsType,
  RetentionAnalyticsStatus,
  RetentionAnalyticsPeriod,
  RetentionAnalyticsCohort,
  RetentionAnalyticsMetric,
  RetentionAnalyticsSegment,
  getRetentionAnalyticsLabel,
  getRetentionAnalyticsStatusLabel,
  getRetentionAnalyticsPeriodLabel,
  getRetentionAnalyticsCohortLabel,
  getRetentionAnalyticsSegmentLabel,
  getRetentionAnalyticsMetricDetailLabel,
  isRetentionAnalyticsActive,
  isRetentionAnalyticsCompleted,
  getRetentionAnalyticsRateValue,
} from '@vubon/shared-constants';

// ============================================================
// Retention Analytics Extended Types
// ============================================================

/**
 * Retention analytics
 */
export interface RetentionAnalytics extends BaseEntity, Timestamp {
  id: ID;
  type: RetentionAnalyticsType;
  status: RetentionAnalyticsStatus;
  period: RetentionAnalyticsPeriod;
  cohort: RetentionAnalyticsCohort;
  metric: RetentionAnalyticsMetric;
  segment: RetentionAnalyticsSegment;
  value: number;
  rate: number;
  isActive: boolean;
  isCompleted: boolean;
  metadata?: Metadata;
}

/**
 * Retention analytics filter
 */
export interface RetentionAnalyticsFilter {
  ids?: ID[];
  types?: RetentionAnalyticsType[];
  statuses?: RetentionAnalyticsStatus[];
  periods?: RetentionAnalyticsPeriod[];
  cohorts?: RetentionAnalyticsCohort[];
  metrics?: RetentionAnalyticsMetric[];
  segments?: RetentionAnalyticsSegment[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isCompleted?: boolean;
  minRate?: number;
  maxRate?: number;
  searchTerm?: string;
}

/**
 * Retention analytics statistics
 */
export interface RetentionAnalyticsStatistics {
  totalAnalytics: number;
  activeAnalytics: number;
  completedAnalytics: number;
  byType: Record<RetentionAnalyticsType, number>;
  byStatus: Record<RetentionAnalyticsStatus, number>;
  byPeriod: Record<RetentionAnalyticsPeriod, number>;
  byCohort: Record<RetentionAnalyticsCohort, number>;
  byMetric: Record<RetentionAnalyticsMetric, number>;
  bySegment: Record<RetentionAnalyticsSegment, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageRate: number;
  maxRate: number;
  minRate: number;
  mostFrequentType: RetentionAnalyticsType;
  mostFrequentPeriod: RetentionAnalyticsPeriod;
  mostFrequentMetric: RetentionAnalyticsMetric;
}

/**
 * Retention analytics summary
 */
export interface RetentionAnalyticsSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  completed: number;
  byType: Record<RetentionAnalyticsType, number>;
  byStatus: Record<RetentionAnalyticsStatus, number>;
  byPeriod: Record<RetentionAnalyticsPeriod, number>;
  byCohort: Record<RetentionAnalyticsCohort, number>;
  byMetric: Record<RetentionAnalyticsMetric, number>;
  bySegment: Record<RetentionAnalyticsSegment, number>;
  retentionTrend: {
    date: Date;
    total: number;
    rate: number;
  }[];
  topTypes: {
    type: RetentionAnalyticsType;
    count: number;
    label: string;
  }[];
  topPeriods: {
    period: RetentionAnalyticsPeriod;
    count: number;
    label: string;
  }[];
  topMetrics: {
    metric: RetentionAnalyticsMetric;
    count: number;
    label: string;
  }[];
}

/**
 * Retention analytics configuration
 */
export interface RetentionAnalyticsConfiguration {
  enabled: boolean;
  defaultType: RetentionAnalyticsType;
  defaultPeriod: RetentionAnalyticsPeriod;
  defaultCohort: RetentionAnalyticsCohort;
  defaultMetric: RetentionAnalyticsMetric;
  defaultSegment: RetentionAnalyticsSegment;
  retentionDays: number;
  autoRefresh: boolean;
  refreshInterval: number;
  notificationOnCompleted: boolean;
  notificationOnFailed: boolean;
  notificationOnThreshold: boolean;
  alertConfig?: RetentionAnalyticsAlertConfig;
}

/**
 * Retention analytics alert configuration
 */
export interface RetentionAnalyticsAlertConfig {
  enabled: boolean;
  thresholdAlert: boolean;
  thresholdValue: number;
  thresholdOperator: 'gt' | 'lt' | 'gte' | 'lte' | 'eq';
  churnAlert: boolean;
  churnThreshold: number;
  notificationChannels: ('email' | 'sms' | 'push' | 'in_app')[];
  cooldownMinutes: number;
}

/**
 * Retention analytics history
 */
export interface RetentionAnalyticsHistory extends BaseEntity, Timestamp {
  id: ID;
  analyticsId: ID;
  action: 'create' | 'update' | 'process' | 'complete' | 'fail' | 'archive' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Retention cohort data
 */
export interface RetentionCohortData extends BaseEntity, Timestamp {
  id: ID;
  cohort: RetentionAnalyticsCohort;
  period: RetentionAnalyticsPeriod;
  size: number;
  retained: number;
  retentionRate: number;
  churnRate: number;
  metadata?: Metadata;
}

/**
 * Retention analytics export
 */
export interface RetentionAnalyticsExport extends BaseEntity, Timestamp {
  id: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: RetentionAnalyticsFilter;
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
  // Retention Analytics Constants
  RETENTION_ANALYTICS,
  RetentionAnalyticsType,
  RetentionAnalyticsStatus,
  RetentionAnalyticsPeriod,
  RetentionAnalyticsCohort,
  RetentionAnalyticsMetric,
  RetentionAnalyticsSegment,
  getRetentionAnalyticsLabel,
  getRetentionAnalyticsStatusLabel,
  getRetentionAnalyticsPeriodLabel,
  getRetentionAnalyticsCohortLabel,
  getRetentionAnalyticsSegmentLabel,
  getRetentionAnalyticsMetricDetailLabel,
  isRetentionAnalyticsActive,
  isRetentionAnalyticsCompleted,
  getRetentionAnalyticsRateValue,
};
