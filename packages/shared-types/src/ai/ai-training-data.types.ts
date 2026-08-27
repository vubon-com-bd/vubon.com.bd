/**
 * AI Training Data Types
 * Type definitions for AI training data based on shared-constants
 * @module AITrainingDataTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants ai training
// ============================================================
import {
  // Training
  AITrainingType,
  AITrainingStatus,
  AITrainingPhase,
  AITrainingDataType,
} from '@vubon/shared-constants';

// ============================================================
// AI Training Data Extended Types
// ============================================================

/**
 * Training dataset
 */
export interface TrainingDataset extends BaseEntity, Timestamp {
  id: ID;
  name: string;
  description?: string;
  type: AITrainingDataType;
  source: 'upload' | 'api' | 'database' | 'external' | 'synthetic';
  format: 'json' | 'csv' | 'parquet' | 'text' | 'image' | 'audio' | 'video' | 'binary';
  size: number; // in bytes
  recordCount: number;
  features: string[];
  labels?: string[];
  isActive: boolean;
  isVerified: boolean;
  isPublic: boolean;
  metadata?: Metadata;
}

/**
 * Training data item
 */
export interface TrainingDataItem extends BaseEntity, Timestamp {
  id: ID;
  datasetId: ID;
  index: number;
  features: Record<string, unknown>;
  label?: unknown;
  weight: number;
  isTrain: boolean;
  isValid: boolean;
  isProcessed: boolean;
  metadata?: Metadata;
}

/**
 * Training data batch
 */
export interface TrainingDataBatch extends BaseEntity, Timestamp {
  id: ID;
  datasetId: ID;
  trainingId: ID;
  batchIndex: number;
  size: number;
  items: TrainingDataItem[];
  status: 'pending' | 'processing' | 'completed' | 'failed';
  startTime?: Date;
  endTime?: Date;
  metadata?: Metadata;
}

/**
 * Training data filter
 */
export interface TrainingDataFilter {
  ids?: ID[];
  datasetIds?: ID[];
  trainingIds?: ID[];
  types?: AITrainingDataType[];
  sources?: ('upload' | 'api' | 'database' | 'external' | 'synthetic')[];
  formats?: ('json' | 'csv' | 'parquet' | 'text' | 'image' | 'audio' | 'video' | 'binary')[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isVerified?: boolean;
  isPublic?: boolean;
  minSize?: number;
  maxSize?: number;
  minRecordCount?: number;
  maxRecordCount?: number;
  searchTerm?: string;
}

/**
 * Training data statistics
 */
export interface TrainingDataStatistics {
  datasetId: ID;
  totalRecords: number;
  uniqueFeatures: number;
  uniqueLabels: number;
  byType: Record<AITrainingDataType, number>;
  bySource: Record<string, number>;
  byFormat: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalSize: number;
  averageRecordSize: number;
  maxRecordSize: number;
  minRecordSize: number;
  trainSplit: number;
  validationSplit: number;
  testSplit: number;
  mostFrequentType: AITrainingDataType;
  mostFrequentSource: string;
  mostFrequentFormat: string;
}

/**
 * Training data summary
 */
export interface TrainingDataSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalDatasets: number;
  active: number;
  verified: number;
  public: number;
  byType: Record<AITrainingDataType, number>;
  bySource: Record<string, number>;
  byFormat: Record<string, number>;
  dataTrend: {
    date: Date;
    totalRecords: number;
    totalSize: number;
  }[];
  topTypes: {
    type: AITrainingDataType;
    count: number;
    label: string;
  }[];
  topSources: {
    source: string;
    count: number;
    label: string;
  }[];
  topFormats: {
    format: string;
    count: number;
    label: string;
  }[];
}

/**
 * Training data configuration
 */
export interface TrainingDataConfiguration {
  enabled: boolean;
  defaultType: AITrainingDataType;
  maxDatasetSize: number;
  maxRecordCount: number;
  allowedFormats: ('json' | 'csv' | 'parquet' | 'text' | 'image' | 'audio' | 'video' | 'binary')[];
  requireVerification: boolean;
  allowPublicDatasets: boolean;
  trainSplitRatio: number;
  validationSplitRatio: number;
  testSplitRatio: number;
  enableShuffling: boolean;
  enableAugmentation: boolean;
  notificationOnUpload: boolean;
  notificationOnVerification: boolean;
  notificationOnError: boolean;
  alertConfig?: TrainingDataAlertConfig;
}

/**
 * Training data alert configuration
 */
export interface TrainingDataAlertConfig {
  enabled: boolean;
  sizeLimitAlert: boolean;
  recordLimitAlert: boolean;
  verificationFailureAlert: boolean;
  formatErrorAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Training data history
 */
export interface TrainingDataHistory extends BaseEntity, Timestamp {
  id: ID;
  datasetId: ID;
  action: 'create' | 'update' | 'verify' | 'unverify' | 'delete' | 'restore' | 'split' | 'augment';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Training data validation
 */
export interface TrainingDataValidation {
  isValid: boolean;
  datasetId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Training data split
 */
export interface TrainingDataSplit extends BaseEntity, Timestamp {
  id: ID;
  datasetId: ID;
  trainRatio: number;
  validationRatio: number;
  testRatio: number;
  trainCount: number;
  validationCount: number;
  testCount: number;
  isRandom: boolean;
  seed?: number;
  metadata?: Metadata;
}

/**
 * Training data augmentation
 */
export interface TrainingDataAugmentation extends BaseEntity, Timestamp {
  id: ID;
  datasetId: ID;
  method:
    | 'rotate'
    | 'flip'
    | 'scale'
    | 'translate'
    | 'noise'
    | 'crop'
    | 'brightness'
    | 'contrast'
    | 'saturation'
    | 'hue';
  params: Record<string, unknown>;
  originalCount: number;
  augmentedCount: number;
  metadata?: Metadata;
}

/**
 * Training data export
 */
export interface TrainingDataExport extends BaseEntity, Timestamp {
  id: ID;
  datasetId: ID;
  format: 'json' | 'csv' | 'parquet' | 'text' | 'binary';
  filter: TrainingDataFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Training data import
 */
export interface TrainingDataImport extends BaseEntity, Timestamp {
  id: ID;
  datasetId: ID;
  format: 'json' | 'csv' | 'parquet' | 'text' | 'image' | 'audio' | 'video' | 'binary';
  data: string;
  filename: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  importedRecords: number;
  failedRecords: number;
  importErrors?: string[];
  importedAt?: Date;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Training
  AITrainingType,
  AITrainingStatus,
  AITrainingPhase,
  AITrainingDataType,
};
