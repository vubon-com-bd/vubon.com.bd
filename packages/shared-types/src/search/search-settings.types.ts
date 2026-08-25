/**
 * Search Settings Types
 * Type definitions for search settings based on shared-constants
 * @module SearchSettingsTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants search
// ============================================================
import {
  // Search Core
  SearchType,
  SearchMode,
  SearchLanguage,
  SearchRegion,
  SearchDefault,
  SearchLimit,
} from '@vubon/shared-constants';

// ============================================================
// Search Settings Types
// ============================================================

/**
 * Search settings
 */
export interface SearchSettings extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  defaultType: SearchType;
  defaultMode: SearchMode;
  defaultLanguage: SearchLanguage;
  defaultRegion: SearchRegion;
  defaultPageSize: number;
  defaultTimeout: number;
  fuzzyEditDistance: number;
  minShouldMatch: number;
  enableExactMode: boolean;
  enableFuzzyMode: boolean;
  enableSemanticMode: boolean;
  enableHybridMode: boolean;
  metadata?: Metadata;
}

/**
 * Search settings configuration
 */
export interface SearchSettingsConfiguration {
  /** Default search type */
  defaultType: SearchType;
  /** Default search mode */
  defaultMode: SearchMode;
  /** Default language */
  defaultLanguage: SearchLanguage;
  /** Default region */
  defaultRegion: SearchRegion;
  /** Default page size */
  defaultPageSize: number;
  /** Max page size */
  maxPageSize: number;
  /** Default timeout in milliseconds */
  defaultTimeout: number;
  /** Default fuzzy edit distance */
  defaultFuzzyEditDistance: number;
  /** Default minimum should match */
  defaultMinShouldMatch: number;
  /** Enable exact mode */
  enableExactMode: boolean;
  /** Enable fuzzy mode */
  enableFuzzyMode: boolean;
  /** Enable semantic mode */
  enableSemanticMode: boolean;
  /** Enable hybrid mode */
  enableHybridMode: boolean;
  /** Max filters per query */
  maxFilters: number;
  /** Max sort fields per query */
  maxSortFields: number;
  /** Max facets per query */
  maxFacets: number;
}

/**
 * Search user preferences
 */
export interface SearchUserPreferences {
  /** User ID */
  userId: ID;
  /** Preferred search type */
  preferredType: SearchType;
  /** Preferred search mode */
  preferredMode: SearchMode;
  /** Preferred language */
  preferredLanguage: SearchLanguage;
  /** Preferred region */
  preferredRegion: SearchRegion;
  /** Preferred page size */
  preferredPageSize: number;
  /** Preferred timeout */
  preferredTimeout: number;
  /** Save search history */
  saveHistory: boolean;
  /** Save search analytics */
  saveAnalytics: boolean;
  /** Enable personalized suggestions */
  enablePersonalizedSuggestions: boolean;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Search settings validation
 */
export interface SearchSettingsValidation {
  /** Whether the settings are valid */
  isValid: boolean;
  /** Settings type */
  type: 'configuration' | 'user' | 'preferences';
  /** Validation errors */
  errors?: string[];
  /** Validation warnings */
  warnings?: string[];
  /** Suggestions */
  suggestions?: string[];
}

/**
 * Search settings update
 */
export interface SearchSettingsUpdate {
  /** Settings to update */
  settings: Partial<SearchSettings>;
  /** Updated by user ID */
  updatedBy: ID;
  /** Reason for update */
  reason?: string;
  /** Timestamp */
  timestamp: Date;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Search settings history
 */
export interface SearchSettingsHistory extends BaseEntity, Timestamp {
  id: ID;
  settingsId: ID;
  userId: ID;
  field: string;
  oldValue: unknown;
  newValue: unknown;
  changedBy: ID;
  reason?: string;
  metadata?: Metadata;
}

/**
 * Search settings export
 */
export interface SearchSettingsExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'yaml' | 'xml';
  settings: Partial<SearchSettings>;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Search settings import
 */
export interface SearchSettingsImport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'yaml' | 'xml';
  data: string;
  filename: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  importedAt?: Date;
  importErrors?: string[];
  metadata?: Metadata;
}

/**
 * Search settings default
 */
export interface SearchSettingsDefault {
  /** Default configuration */
  config: SearchSettingsConfiguration;
  /** User preferences default */
  preferences: SearchUserPreferences;
  /** Settings version */
  version: string;
  /** Last updated */
  updatedAt: Date;
  /** Metadata */
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Search Core
  SearchType,
  SearchMode,
  SearchLanguage,
  SearchRegion,
  SearchDefault,
  SearchLimit,
};
