/**
 * Search Relevance Types
 * Type definitions for search relevance based on shared-constants
 * @module SearchRelevanceTypes
 */

import { Metadata } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants search relevance
// ============================================================
import {
  // Relevance Constants
  SEARCH_RELEVANCE,
  SearchRelevanceType,
  SearchRelevanceFactor,
  SearchRelevanceWeight,
  SearchRelevanceDefault,
  SearchRelevanceLimit,
  searchRelevanceGetTypeLabel,
  searchRelevanceGetFactorLabel,
  searchRelevanceGetWeightLabel,
  searchRelevanceIsBM25,
  searchRelevanceIsTFIDF,
  searchRelevanceIsSemantic,
  searchRelevanceIsHybrid,
  searchRelevanceGetDefaultType,
  searchRelevanceGetMinScore,
  searchRelevanceGetDefaultBoost,
  searchRelevanceGetMinShouldMatch,
  searchRelevanceGetTitleWeight,
  searchRelevanceGetDescriptionWeight,
} from '@vubon/shared-constants';

// ============================================================
// Search Relevance Types
// ============================================================

/**
 * Search relevance configuration
 */
export interface SearchRelevance {
  /** Relevance type */
  type: SearchRelevanceType;
  /** Relevance factors */
  factors: SearchRelevanceFactorConfig[];
  /** Minimum score */
  minScore: number;
  /** Default boost */
  defaultBoost: number;
  /** Minimum should match */
  minShouldMatch: number;
  /** Title weight */
  titleWeight: number;
  /** Description weight */
  descriptionWeight: number;
  /** Is BM25 */
  isBM25: boolean;
  /** Is TFIDF */
  isTFIDF: boolean;
  /** Is semantic */
  isSemantic: boolean;
  /** Is hybrid */
  isHybrid: boolean;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Relevance factor configuration
 */
export interface SearchRelevanceFactorConfig {
  /** Factor type */
  type: SearchRelevanceFactor;
  /** Factor weight */
  weight: SearchRelevanceWeight;
  /** Factor boost */
  boost: number;
  /** Is enabled */
  enabled: boolean;
  /** Field name */
  field?: string;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Relevance score result
 */
export interface SearchRelevanceScore {
  /** Document ID */
  documentId: string;
  /** Score value */
  score: number;
  /** Score components */
  components: Record<string, number>;
  /** Is relevant */
  isRelevant: boolean;
  /** Explanation */
  explanation?: string;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Relevance request
 */
export interface SearchRelevanceRequest {
  /** Query text */
  query: string;
  /** Relevance type */
  type?: SearchRelevanceType;
  /** Minimum score */
  minScore?: number;
  /** Default boost */
  defaultBoost?: number;
  /** Minimum should match */
  minShouldMatch?: number;
  /** Title weight */
  titleWeight?: number;
  /** Description weight */
  descriptionWeight?: number;
  /** Factors to include */
  factors?: SearchRelevanceFactor[];
  /** Field to search */
  fields?: string[];
}

/**
 * Relevance response
 */
export interface SearchRelevanceResponse {
  /** Query text */
  query: string;
  /** Results */
  results: SearchRelevanceScore[];
  /** Relevance type used */
  type: SearchRelevanceType;
  /** Total results */
  total: number;
  /** Average score */
  avgScore: number;
  /** Max score */
  maxScore: number;
  /** Min score */
  minScore: number;
  /** Took time in milliseconds */
  took: number;
}

/**
 * Relevance validation
 */
export interface SearchRelevanceValidation {
  /** Whether the relevance config is valid */
  isValid: boolean;
  /** Relevance type */
  type: SearchRelevanceType;
  /** Validation errors */
  errors?: string[];
  /** Validation warnings */
  warnings?: string[];
  /** Suggestions */
  suggestions?: string[];
}

/**
 * Relevance statistics
 */
export interface SearchRelevanceStatistics {
  /** Total relevance configs */
  totalConfigs: number;
  /** Configs by type */
  byType: Record<SearchRelevanceType, number>;
  /** Configs by factor */
  byFactor: Record<SearchRelevanceFactor, number>;
  /** Average score */
  avgScore: number;
  /** Max score */
  maxScore: number;
  /** Min score */
  minScore: number;
  /** Most common type */
  mostCommonType: SearchRelevanceType;
  /** Most common factor */
  mostCommonFactor: SearchRelevanceFactor;
  /** Performance */
  performance: {
    avgTimeMs: number;
    minTimeMs: number;
    maxTimeMs: number;
  };
}

/**
 * Relevance training
 */
export interface SearchRelevanceTraining {
  /** Training ID */
  id: string;
  /** Training name */
  name: string;
  /** Training type */
  type: SearchRelevanceType;
  /** Training data */
  data: SearchRelevanceTrainingData[];
  /** Status */
  status: 'pending' | 'training' | 'completed' | 'failed';
  /** Progress */
  progress: number;
  /** Created at */
  createdAt: Date;
  /** Updated at */
  updatedAt: Date;
  /** Completed at */
  completedAt?: Date;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Relevance training data
 */
export interface SearchRelevanceTrainingData {
  /** Query text */
  query: string;
  /** Document ID */
  documentId: string;
  /** Relevance score (0-1) */
  relevance: number;
  /** Is relevant */
  isRelevant: boolean;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Relevance optimization
 */
export interface SearchRelevanceOptimization {
  /** Optimization ID */
  id: string;
  /** Optimization name */
  name: string;
  /** Relevance type */
  type: SearchRelevanceType;
  /** Optimization parameters */
  parameters: {
    titleWeight: number;
    descriptionWeight: number;
    defaultBoost: number;
    minShouldMatch: number;
  };
  /** Performance metrics */
  metrics: {
    precision: number;
    recall: number;
    f1Score: number;
    averagePrecision: number;
  };
  /** Created at */
  createdAt: Date;
  /** Metadata */
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Relevance Constants
  SEARCH_RELEVANCE,
  SearchRelevanceType,
  SearchRelevanceFactor,
  SearchRelevanceWeight,
  SearchRelevanceDefault,
  SearchRelevanceLimit,
  searchRelevanceGetTypeLabel,
  searchRelevanceGetFactorLabel,
  searchRelevanceGetWeightLabel,
  searchRelevanceIsBM25,
  searchRelevanceIsTFIDF,
  searchRelevanceIsSemantic,
  searchRelevanceIsHybrid,
  searchRelevanceGetDefaultType,
  searchRelevanceGetMinScore,
  searchRelevanceGetDefaultBoost,
  searchRelevanceGetMinShouldMatch,
  searchRelevanceGetTitleWeight,
  searchRelevanceGetDescriptionWeight,
};
