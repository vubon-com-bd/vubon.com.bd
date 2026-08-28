/**
 * Vendor Performance Types
 * Type definitions for vendor performance metrics based on shared-constants
 * @module VendorPerformanceTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor performance
// ============================================================
import {
  // Vendor Performance
  VENDOR_PERFORMANCE,
  VendorPerformanceMetric,
  VendorPerformanceStatus,
  VendorPerformancePeriod,
  VendorPerformanceScore,
  VendorPerformanceColor,
  VendorPerformanceIcon,
  vendorPerformanceGetMetricLabel,
  vendorPerformanceGetStatusLabel,
  vendorPerformanceGetColor,
  vendorPerformanceGetStatusFromScore,
  vendorPerformanceGetPeriodLabel,
  vendorPerformanceGetMetricWeight,
  vendorPerformanceIsGood,
  vendorPerformanceIsPoor,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Performance Extended Types
// ============================================================

/**
 * Vendor performance
 */
export interface VendorPerformance extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  metric: VendorPerformanceMetric;
  status: VendorPerformanceStatus;
  period: VendorPerformancePeriod;
  score: VendorPerformanceScore;
  value: number;
  target: number;
  percentage: number;
  isGood: boolean;
  isPoor: boolean;
  date: Date;
  metadata?: Metadata;
}

/**
 * Vendor performance filter
 */
export interface VendorPerformanceFilter {
  ids?: ID[];
  vendorIds?: ID[];
  userIds?: ID[];
  metrics?: VendorPerformanceMetric[];
  statuses?: VendorPerformanceStatus[];
  periods?: VendorPerformancePeriod[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minScore?: number;
  maxScore?: number;
  isGood?: boolean;
  isPoor?: boolean;
  searchTerm?: string;
}

/**
 * Vendor performance statistics
 */
export interface VendorPerformanceStatistics {
  vendorId: ID;
  totalPerformances: number;
  excellentPerformances: number;
  goodPerformances: number;
  averagePerformances: number;
  poorPerformances: number;
  criticalPerformances: number;
  byMetric: Record<VendorPerformanceMetric, number>;
  byStatus: Record<VendorPerformanceStatus, number>;
  byPeriod: Record<VendorPerformancePeriod, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageScore: number;
  maxScore: number;
  minScore: number;
  overallStatus: VendorPerformanceStatus;
  mostFrequentMetric: VendorPerformanceMetric;
  mostFrequentStatus: VendorPerformanceStatus;
  mostFrequentPeriod: VendorPerformancePeriod;
}

/**
 * Vendor performance summary
 */
export interface VendorPerformanceSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalPerformances: number;
  excellent: number;
  good: number;
  average: number;
  poor: number;
  critical: number;
  byMetric: Record<VendorPerformanceMetric, number>;
  byStatus: Record<VendorPerformanceStatus, number>;
  byPeriod: Record<VendorPerformancePeriod, number>;
  performanceTrend: {
    date: Date;
    score: number;
    status: VendorPerformanceStatus;
  }[];
  topMetrics: {
    metric: VendorPerformanceMetric;
    score: number;
    label: string;
  }[];
  topStatuses: {
    status: VendorPerformanceStatus;
    count: number;
    label: string;
  }[];
  overallMetrics: {
    averageScore: number;
    maxScore: number;
    minScore: number;
    overallStatus: VendorPerformanceStatus;
  };
  weightedScore: number;
}

/**
 * Vendor performance configuration
 */
export interface VendorPerformanceConfiguration {
  enabled: boolean;
  defaultPeriod: VendorPerformancePeriod;
  autoCalculate: boolean;
  calculateFrequency: VendorPerformancePeriod;
  weightage: Record<VendorPerformanceMetric, number>;
  threshold: {
    excellent: VendorPerformanceScore;
    good: VendorPerformanceScore;
    average: VendorPerformanceScore;
    poor: VendorPerformanceScore;
    critical: VendorPerformanceScore;
  };
  notificationOnStatusChange: boolean;
  notificationOnPoor: boolean;
  notificationOnCritical: boolean;
  alertConfig?: VendorPerformanceAlertConfig;
}

/**
 * Vendor performance alert configuration
 */
export interface VendorPerformanceAlertConfig {
  enabled: boolean;
  poorPerformanceAlert: boolean;
  criticalPerformanceAlert: boolean;
  improvementAlert: boolean;
  declineAlert: boolean;
  thresholdChangeAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Vendor performance history
 */
export interface VendorPerformanceHistory extends BaseEntity, Timestamp {
  id: ID;
  performanceId: ID;
  vendorId: ID;
  userId: ID;
  action: 'calculate' | 'update' | 'status_change' | 'threshold_change';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Vendor performance validation
 */
export interface VendorPerformanceValidation {
  isValid: boolean;
  performanceId: ID;
  vendorId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor performance export
 */
export interface VendorPerformanceExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VendorPerformanceFilter;
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
  // Vendor Performance
  VENDOR_PERFORMANCE,
  VendorPerformanceMetric,
  VendorPerformanceStatus,
  VendorPerformancePeriod,
  VendorPerformanceScore,
  VendorPerformanceColor,
  VendorPerformanceIcon,
  vendorPerformanceGetMetricLabel,
  vendorPerformanceGetStatusLabel,
  vendorPerformanceGetColor,
  vendorPerformanceGetStatusFromScore,
  vendorPerformanceGetPeriodLabel,
  vendorPerformanceGetMetricWeight,
  vendorPerformanceIsGood,
  vendorPerformanceIsPoor,
};
