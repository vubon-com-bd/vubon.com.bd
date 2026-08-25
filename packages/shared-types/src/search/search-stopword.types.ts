/**
 * Search Stopword Types
 * Type definitions for search stopwords based on shared-constants
 * @module SearchStopwordTypes
 */

import { Metadata } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants search stopword
// ============================================================
import {
  // Stopword Constants
  SEARCH_STOPWORD,
  SearchStopwordType,
  SearchStopwordLanguage,
  SearchStopwordDefault,
  SearchStopwordLimit,
  searchStopwordGetTypeLabel,
  searchStopwordGetLanguageLabel,
  searchStopwordIsStandardType,
  searchStopwordIsCustomType,
  searchStopwordIsLanguageType,
  searchStopwordGetMaxStopwords,
  searchStopwordGetCommonEn,
  searchStopwordIsCommonEn,
  searchStopwordIsCaseSensitive,
  searchStopwordShouldRemoveDuplicates,
  searchStopwordShouldAutoUpdate,
} from '@vubon/shared-constants';

// ============================================================
// Search Stopword Types
// ============================================================

/**
 * Search stopword
 */
export interface SearchStopword {
  /** Stopword text */
  text: string;
  /** Stopword type */
  type: SearchStopwordType;
  /** Stopword language */
  language: SearchStopwordLanguage;
  /** Is standard stopword */
  isStandard: boolean;
  /** Is custom stopword */
  isCustom: boolean;
  /** Is language stopword */
  isLanguage: boolean;
  /** Is common English stopword */
  isCommonEn: boolean;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Stopword list
 */
export interface SearchStopwordList {
  /** List ID */
  id: string;
  /** List name */
  name: string;
  /** Language */
  language: SearchStopwordLanguage;
  /** Type */
  type: SearchStopwordType;
  /** Stopwords in the list */
  stopwords: SearchStopword[];
  /** Is active */
  isActive: boolean;
  /** Is standard */
  isStandard: boolean;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Stopword request
 */
export interface SearchStopwordRequest {
  /** Query text */
  text: string;
  /** Stopword type */
  type?: SearchStopwordType;
  /** Stopword language */
  language?: SearchStopwordLanguage;
  /** Remove duplicates */
  removeDuplicates?: boolean;
}

/**
 * Stopword response
 */
export interface SearchStopwordResponse {
  /** Original text */
  original: string;
  /** Filtered text (without stopwords) */
  filtered: string;
  /** Removed stopwords */
  removed: SearchStopword[];
  /** Total stopwords removed */
  totalRemoved: number;
}

/**
 * Stopword configuration
 */
export interface SearchStopwordConfiguration {
  /** Maximum stopwords */
  maxStopwords: number;
  /** Default stopword type */
  defaultType: SearchStopwordType;
  /** Default language */
  defaultLanguage: SearchStopwordLanguage;
  /** Is case sensitive */
  isCaseSensitive: boolean;
  /** Should remove duplicates */
  removeDuplicates: boolean;
  /** Should auto update */
  autoUpdate: boolean;
  /** Update interval in days */
  updateIntervalDays: number;
  /** Enable caching */
  enableCache: boolean;
  /** Cache TTL in seconds */
  cacheTTL: number;
}

/**
 * Stopword validation
 */
export interface SearchStopwordValidation {
  /** Whether the stopword is valid */
  isValid: boolean;
  /** Stopword text */
  text: string;
  /** Validation errors */
  errors?: string[];
  /** Validation warnings */
  warnings?: string[];
  /** Suggestions */
  suggestions?: string[];
}

/**
 * Stopword statistics
 */
export interface SearchStopwordStatistics {
  /** Total stopwords */
  totalStopwords: number;
  /** Stopwords by type */
  byType: Record<SearchStopwordType, number>;
  /** Stopwords by language */
  byLanguage: Record<SearchStopwordLanguage, number>;
  /** Standard stopwords */
  standardCount: number;
  /** Custom stopwords */
  customCount: number;
  /** Common English stopwords */
  commonEnCount: number;
  /** Total stopword lists */
  totalLists: number;
}

/**
 * Stopword export
 */
export interface SearchStopwordExport {
  /** Export format */
  format: 'json' | 'csv' | 'txt';
  /** Stopwords to export */
  stopwords: SearchStopword[];
  /** Export language */
  language?: SearchStopwordLanguage;
  /** Export type */
  type?: SearchStopwordType;
  /** Export filename */
  filename: string;
  /** Export metadata */
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Stopword Constants
  SEARCH_STOPWORD,
  SearchStopwordType,
  SearchStopwordLanguage,
  SearchStopwordDefault,
  SearchStopwordLimit,
  searchStopwordGetTypeLabel,
  searchStopwordGetLanguageLabel,
  searchStopwordIsStandardType,
  searchStopwordIsCustomType,
  searchStopwordIsLanguageType,
  searchStopwordGetMaxStopwords,
  searchStopwordGetCommonEn,
  searchStopwordIsCommonEn,
  searchStopwordIsCaseSensitive,
  searchStopwordShouldRemoveDuplicates,
  searchStopwordShouldAutoUpdate,
};
