/**
 * AI Cluster Types
 * Type definitions for AI clustering based on shared-constants
 * @module AIClusterTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants ai cluster
// ============================================================
import {
  // Cluster
  AI_CLUSTER,
  AIClusterType,
  AIClusterStatus,
  AIClusterCategory,
  AIClusterAlgorithm,
  AIClusterMetric,
  AIClusterDistanceMetric,
  AIClusterLimit,
  AIClusterFeature,
  AIClusterQuality,
  AIClusterFormat,
  getAiClusterTypeLabel,
  getAiClusterStatusLabelBasic,
  getAiClusterCategoryLabel,
  getAiClusterAlgorithmLabel,
  getAiClusterMetricLabel,
  getAiClusterDistanceMetricLabel,
  getAiClusterQualityLabel,
  isAiClusterActive,
  isAiClusterProcessing,
  isAiClusterFailed,
  getAiClusterDefaultClusters,
  getAiClusterDefaultIterations,
  getAiClusterDefaultEpsilon,
  getAiClusterDefaultMinPts,
  getAiClusterAlgorithmCategory,
  getAiClusterQualityScore,
  // Cluster Type
  AI_CLUSTER_TYPE,
  AIClusterDomain,
  AIClusterSubType,
  AIClusterShape,
  AIClusterSize,
  AIClusterDensity,
  AIClusterSeparability,
  getAiClusterDomainLabel,
  getAiClusterSubTypeLabel,
  getAiClusterShapeLabel,
  getAiClusterSizeLabel,
  getAiClusterDensityLabel,
  getAiClusterSeparabilityLabel,
  getAiClusterSizeThreshold,
  // Cluster Status
  AI_CLUSTER_STATUS_TYPES,
  AI_CLUSTER_STATUS,
  AIClusterStatusType,
  AIClusterStatusCategory,
  AIClusterStatusSeverity,
  AIClusterStatusColor,
  getAiClusterStatusLabel,
  getAiClusterStatusCategory,
  getAiClusterStatusSeverity,
  getAiClusterStatusColor,
  isAiClusterActiveStatus,
  isAiClusterCompleted,
  isAiClusterFailedStatus,
  getAiClusterStatusProgress,
} from '@vubon/shared-constants';

// ============================================================
// AI Cluster Extended Types
// ============================================================

/**
 * AI Cluster
 */
export interface AICluster extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  type: AIClusterType;
  status: AIClusterStatus;
  category: AIClusterCategory;
  algorithm: AIClusterAlgorithm;
  metric: AIClusterMetric;
  distanceMetric: AIClusterDistanceMetric;
  clusters: number;
  iterations: number;
  quality: AIClusterQuality;
  features: AIClusterFeature[];
  format: AIClusterFormat;
  isActive: boolean;
  isProcessing: boolean;
  isFailed: boolean;
  metadata?: Metadata;
}

/**
 * AI Cluster Filter
 */
export interface AIClusterFilter {
  ids?: ID[];
  modelIds?: ID[];
  types?: AIClusterType[];
  statuses?: AIClusterStatus[];
  categories?: AIClusterCategory[];
  algorithms?: AIClusterAlgorithm[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isProcessing?: boolean;
  isFailed?: boolean;
  minClusters?: number;
  maxClusters?: number;
  minIterations?: number;
  maxIterations?: number;
  minQuality?: number;
  maxQuality?: number;
  searchTerm?: string;
}

/**
 * AI Cluster Statistics
 */
export interface AIClusterStatistics {
  modelId: ID;
  totalClusters: number;
  activeClusters: number;
  processingClusters: number;
  failedClusters: number;
  byType: Record<AIClusterType, number>;
  byStatus: Record<AIClusterStatus, number>;
  byCategory: Record<AIClusterCategory, number>;
  byAlgorithm: Record<AIClusterAlgorithm, number>;
  byMetric: Record<AIClusterMetric, number>;
  byDistanceMetric: Record<AIClusterDistanceMetric, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageClusters: number;
  maxClusters: number;
  minClusters: number;
  averageIterations: number;
  maxIterations: number;
  minIterations: number;
  averageQuality: number;
  maxQuality: number;
  minQuality: number;
  mostFrequentType: AIClusterType;
  mostFrequentAlgorithm: AIClusterAlgorithm;
  mostFrequentMetric: AIClusterMetric;
}

/**
 * AI Cluster Summary
 */
export interface AIClusterSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalClusters: number;
  active: number;
  processing: number;
  failed: number;
  byType: Record<AIClusterType, number>;
  byStatus: Record<AIClusterStatus, number>;
  byCategory: Record<AIClusterCategory, number>;
  byAlgorithm: Record<AIClusterAlgorithm, number>;
  byMetric: Record<AIClusterMetric, number>;
  byDistanceMetric: Record<AIClusterDistanceMetric, number>;
  clusterTrend: {
    date: Date;
    total: number;
    active: number;
    processing: number;
  }[];
  topTypes: {
    type: AIClusterType;
    count: number;
    label: string;
  }[];
  topAlgorithms: {
    algorithm: AIClusterAlgorithm;
    count: number;
    label: string;
  }[];
  topMetrics: {
    metric: AIClusterMetric;
    count: number;
    label: string;
  }[];
}

/**
 * AI Cluster Configuration
 */
export interface AIClusterConfiguration {
  enabled: boolean;
  defaultType: AIClusterType;
  defaultCategory: AIClusterCategory;
  defaultAlgorithm: AIClusterAlgorithm;
  defaultMetric: AIClusterMetric;
  defaultDistanceMetric: AIClusterDistanceMetric;
  defaultClusters: number;
  defaultIterations: number;
  defaultEpsilon: number;
  defaultMinPts: number;
  maxClusters: number;
  maxIterations: number;
  maxClustersPerModel: number;
  enableCache: boolean;
  cacheTTLSeconds: number;
  enableLogging: boolean;
  notificationOnProcess: boolean;
  notificationOnComplete: boolean;
  notificationOnFailure: boolean;
  alertConfig?: AIClusterAlertConfig;
}

/**
 * AI Cluster Alert Configuration
 */
export interface AIClusterAlertConfig {
  enabled: boolean;
  failureAlert: boolean;
  performanceAlert: boolean;
  performanceThreshold: number;
  qualityDropAlert: boolean;
  qualityDropThreshold: number;
  convergenceAlert: boolean;
  convergenceThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * AI Cluster History
 */
export interface AIClusterHistory extends BaseEntity, Timestamp {
  id: ID;
  clusterId: ID;
  modelId: ID;
  action: 'create' | 'update' | 'process' | 'complete' | 'fail' | 'retry' | 'cancel' | 'delete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * AI Cluster Validation
 */
export interface AIClusterValidation {
  isValid: boolean;
  clusterId: ID;
  modelId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * AI Cluster Export
 */
export interface AIClusterExport extends BaseEntity, Timestamp {
  id: ID;
  modelId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: AIClusterFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * AI Cluster Point
 */
export interface AIClusterPoint extends BaseEntity, Timestamp {
  id: ID;
  clusterId: ID;
  modelId: ID;
  point: number[];
  label: number;
  distanceToCentroid: number;
  metadata?: Metadata;
}

/**
 * AI Cluster Centroid
 */
export interface AIClusterCentroid extends BaseEntity, Timestamp {
  id: ID;
  clusterId: ID;
  modelId: ID;
  centroid: number[];
  size: number;
  variance: number;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Cluster
  AI_CLUSTER,
  AIClusterType,
  AIClusterStatus,
  AIClusterCategory,
  AIClusterAlgorithm,
  AIClusterMetric,
  AIClusterDistanceMetric,
  AIClusterLimit,
  AIClusterFeature,
  AIClusterQuality,
  AIClusterFormat,
  getAiClusterTypeLabel,
  getAiClusterStatusLabelBasic,
  getAiClusterCategoryLabel,
  getAiClusterAlgorithmLabel,
  getAiClusterMetricLabel,
  getAiClusterDistanceMetricLabel,
  getAiClusterQualityLabel,
  isAiClusterActive,
  isAiClusterProcessing,
  isAiClusterFailed,
  getAiClusterDefaultClusters,
  getAiClusterDefaultIterations,
  getAiClusterDefaultEpsilon,
  getAiClusterDefaultMinPts,
  getAiClusterAlgorithmCategory,
  getAiClusterQualityScore,
  // Cluster Type
  AI_CLUSTER_TYPE,
  AIClusterDomain,
  AIClusterSubType,
  AIClusterShape,
  AIClusterSize,
  AIClusterDensity,
  AIClusterSeparability,
  getAiClusterDomainLabel,
  getAiClusterSubTypeLabel,
  getAiClusterShapeLabel,
  getAiClusterSizeLabel,
  getAiClusterDensityLabel,
  getAiClusterSeparabilityLabel,
  getAiClusterSizeThreshold,
  // Cluster Status
  AI_CLUSTER_STATUS_TYPES,
  AI_CLUSTER_STATUS,
  AIClusterStatusType,
  AIClusterStatusCategory,
  AIClusterStatusSeverity,
  AIClusterStatusColor,
  getAiClusterStatusLabel,
  getAiClusterStatusCategory,
  getAiClusterStatusSeverity,
  getAiClusterStatusColor,
  isAiClusterActiveStatus,
  isAiClusterCompleted,
  isAiClusterFailedStatus,
  getAiClusterStatusProgress,
};
