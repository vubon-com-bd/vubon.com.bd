/**
 * Search Index Types
 * Type definitions for search indexes based on shared-constants
 * @module SearchIndexTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants search index
// ============================================================
import {
  // Index Constants
  SEARCH_INDEX,
  SearchIndexType,
  SearchIndexStatus,
  SearchIndexAnalyzer,
  SearchIndexMapping,
  SearchIndexDefault,
  SearchIndexLimit,
  searchIndexGetTypeLabel,
  searchIndexGetStatusLabel,
  searchIndexGetAnalyzerLabel,
  searchIndexGetMappingLabel,
  searchIndexIsProductType,
  searchIndexIsContentType,
  searchIndexIsOpen,
  searchIndexIsActive,
  searchIndexIsError,
  searchIndexGetDefaultShards,
  searchIndexGetDefaultReplicas,
  searchIndexGetDefaultBatchSize,
  searchIndexGetMaxShards,
} from '@vubon/shared-constants';

// ============================================================
// Search Index Types
// ============================================================

/**
 * Search index
 */
export interface SearchIndex extends BaseEntity, Timestamp {
  id: ID;
  name: string;
  type: SearchIndexType;
  status: SearchIndexStatus;
  analyzer: SearchIndexAnalyzer;
  mapping: SearchIndexMapping;
  shards: number;
  replicas: number;
  batchSize: number;
  isProduct: boolean;
  isContent: boolean;
  isOpen: boolean;
  isActive: boolean;
  isError: boolean;
  documentCount: number;
  sizeInBytes: number;
  lastOptimizedAt?: Date;
  metadata?: Metadata;
}

/**
 * Index field mapping
 */
export interface SearchIndexFieldMapping {
  /** Field name */
  field: string;
  /** Field type */
  type: 'text' | 'keyword' | 'number' | 'date' | 'boolean' | 'geo_point' | 'object' | 'nested';
  /** Analyzer for text fields */
  analyzer?: SearchIndexAnalyzer;
  /** Search analyzer */
  searchAnalyzer?: SearchIndexAnalyzer;
  /** Is indexed */
  indexed: boolean;
  /** Is stored */
  stored: boolean;
  /** Is searchable */
  searchable: boolean;
  /** Is sortable */
  sortable: boolean;
  /** Is facetable */
  facetable: boolean;
  /** Fields for nested/object types */
  fields?: SearchIndexFieldMapping[];
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Index configuration
 */
export interface SearchIndexConfiguration {
  /** Index name */
  name: string;
  /** Index type */
  type: SearchIndexType;
  /** Index analyzer */
  analyzer: SearchIndexAnalyzer;
  /** Index mapping */
  mapping: SearchIndexMapping;
  /** Number of shards */
  shards: number;
  /** Number of replicas */
  replicas: number;
  /** Batch size */
  batchSize: number;
  /** Field mappings */
  fieldMappings: SearchIndexFieldMapping[];
  /** Settings */
  settings?: {
    maxResultWindow: number;
    maxRescoreWindow: number;
    maxInnerResultWindow: number;
    refreshInterval: string;
  };
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Index request
 */
export interface SearchIndexRequest {
  /** Index name */
  name: string;
  /** Index type */
  type: SearchIndexType;
  /** Analyzer */
  analyzer?: SearchIndexAnalyzer;
  /** Mapping */
  mapping?: SearchIndexMapping;
  /** Number of shards */
  shards?: number;
  /** Number of replicas */
  replicas?: number;
  /** Batch size */
  batchSize?: number;
  /** Field mappings */
  fieldMappings?: SearchIndexFieldMapping[];
  /** Settings */
  settings?: Record<string, unknown>;
}

/**
 * Index response
 */
export interface SearchIndexResponse {
  /** Index name */
  name: string;
  /** Index status */
  status: SearchIndexStatus;
  /** Index type */
  type: SearchIndexType;
  /** Document count */
  documentCount: number;
  /** Index size in bytes */
  sizeInBytes: number;
  /** Is open */
  isOpen: boolean;
  /** Is active */
  isActive: boolean;
  /** Timestamp */
  timestamp: Date;
}

/**
 * Index validation
 */
export interface SearchIndexValidation {
  /** Whether the index is valid */
  isValid: boolean;
  /** Index name */
  name: string;
  /** Validation errors */
  errors?: string[];
  /** Validation warnings */
  warnings?: string[];
  /** Suggestions */
  suggestions?: string[];
}

/**
 * Index statistics
 */
export interface SearchIndexStatistics {
  /** Total indexes */
  totalIndexes: number;
  /** Indexes by type */
  byType: Record<SearchIndexType, number>;
  /** Indexes by status */
  byStatus: Record<SearchIndexStatus, number>;
  /** Total documents */
  totalDocuments: number;
  /** Total size in bytes */
  totalSizeInBytes: number;
  /** Average document count per index */
  avgDocumentCount: number;
  /** Most common analyzer */
  mostCommonAnalyzer: SearchIndexAnalyzer;
  /** Most common mapping */
  mostCommonMapping: SearchIndexMapping;
  /** Performance */
  performance: {
    avgIndexTimeMs: number;
    avgSearchTimeMs: number;
    avgOptimizeTimeMs: number;
  };
}

/**
 * Index document
 */
export interface SearchIndexDocument {
  /** Document ID */
  id: string;
  /** Document data */
  data: Record<string, unknown>;
  /** Document version */
  version?: number;
  /** Index name */
  index: string;
  /** Type */
  type?: string;
  /** Routing */
  routing?: string;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Index batch operation
 */
export interface SearchIndexBatchOperation {
  /** Operation type */
  operation: 'index' | 'update' | 'delete';
  /** Document ID */
  id: string;
  /** Document data */
  data?: Record<string, unknown>;
  /** Index name */
  index: string;
  /** Routing */
  routing?: string;
  /** Version */
  version?: number;
  /** Version type */
  versionType?: 'internal' | 'external' | 'external_gte' | 'force';
}

/**
 * Index batch response
 */
export interface SearchIndexBatchResponse {
  /** Items in the batch */
  items: {
    id: string;
    status: 'success' | 'error';
    error?: string;
    version?: number;
  }[];
  /** Total items */
  total: number;
  /** Successful items */
  successCount: number;
  /** Failed items */
  failedCount: number;
  /** Took time in milliseconds */
  took: number;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Index Constants
  SEARCH_INDEX,
  SearchIndexType,
  SearchIndexStatus,
  SearchIndexAnalyzer,
  SearchIndexMapping,
  SearchIndexDefault,
  SearchIndexLimit,
  searchIndexGetTypeLabel,
  searchIndexGetStatusLabel,
  searchIndexGetAnalyzerLabel,
  searchIndexGetMappingLabel,
  searchIndexIsProductType,
  searchIndexIsContentType,
  searchIndexIsOpen,
  searchIndexIsActive,
  searchIndexIsError,
  searchIndexGetDefaultShards,
  searchIndexGetDefaultReplicas,
  searchIndexGetDefaultBatchSize,
  searchIndexGetMaxShards,
};
