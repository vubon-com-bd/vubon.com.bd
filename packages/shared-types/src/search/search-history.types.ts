/**
 * Search History Types
 * Type definitions for search history based on shared-constants
 * @module SearchHistoryTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import SearchHistory from search.types
// ============================================================
import type { SearchHistory } from './search.types';

// ============================================================
// Import from shared-constants search
// ============================================================
import {
  // Search Core
  SearchType,
  SearchMode,
  SearchLanguage,
  SearchRegion,
} from '@vubon/shared-constants';

// ============================================================
// Search History Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Search history filter
 */
export interface SearchHistoryFilter {
  field: string;
  operator: string;
  value: unknown;
}

/**
 * Search history sort
 */
export interface SearchHistorySort {
  field: string;
  order: 'asc' | 'desc';
}

/**
 * Search history query
 */
export interface SearchHistoryQuery {
  /** User ID */
  userId?: ID;
  /** Search type */
  type?: SearchType;
  /** Search mode */
  mode?: SearchMode;
  /** Date range */
  dateRange?: {
    start: Date;
    end: Date;
  };
  /** Minimum results */
  minResults?: number;
  /** Maximum results */
  maxResults?: number;
  /** Is successful */
  isSuccessful?: boolean;
  /** Has clicks */
  hasClicks?: boolean;
  /** Limit */
  limit?: number;
  /** Offset */
  offset?: number;
  /** Sort by */
  sortBy?: 'timestamp' | 'results' | 'timeSpent';
  /** Sort order */
  sortOrder?: 'asc' | 'desc';
}

/**
 * Search history response
 */
export interface SearchHistoryResponse {
  /** History entries */
  entries: SearchHistory[];
  /** Total entries */
  total: number;
  /** Limit */
  limit: number;
  /** Offset */
  offset: number;
  /** Has more */
  hasMore: boolean;
  /** Timestamp */
  timestamp: Date;
}

/**
 * Search history statistics
 */
export interface SearchHistoryStatistics {
  /** User ID */
  userId: ID;
  /** Total searches */
  totalSearches: number;
  /** Successful searches */
  successfulSearches: number;
  /** Searches with clicks */
  searchesWithClicks: number;
  /** Average results per search */
  avgResults: number;
  /** Average time spent */
  avgTimeSpent: number;
  /** Most common search type */
  mostCommonType: SearchType;
  /** Most common search mode */
  mostCommonMode: SearchMode;
  /** Most common language */
  mostCommonLanguage: SearchLanguage;
  /** Most common region */
  mostCommonRegion: SearchRegion;
  /** Top queries */
  topQueries: { query: string; count: number }[];
  /** Search history by date */
  byDate: { date: Date; count: number }[];
  /** Date range */
  dateRange: {
    start: Date;
    end: Date;
  };
}

/**
 * Search history trend
 */
export interface SearchHistoryTrend {
  /** Trend type */
  type: 'up' | 'down' | 'stable';
  /** Trend data */
  data: {
    date: Date;
    count: number;
    successRate: number;
    clickRate: number;
  }[];
  /** Summary */
  summary: {
    total: number;
    average: number;
    max: number;
    min: number;
    standardDeviation?: number;
  };
}

/**
 * Search history configuration
 */
export interface SearchHistoryConfiguration {
  /** Enable history tracking */
  enabled: boolean;
  /** Retention days */
  retentionDays: number;
  /** Maximum entries per user */
  maxEntriesPerUser: number;
  /** Track clicks */
  trackClicks: boolean;
  /** Track time spent */
  trackTimeSpent: boolean;
  /** Track device info */
  trackDevice: boolean;
  /** Track location info */
  trackLocation: boolean;
  /** Auto delete after retention */
  autoDelete: boolean;
  /** Enable analytics */
  enableAnalytics: boolean;
}

/**
 * Search history validation
 */
export interface SearchHistoryValidation {
  /** Whether the history entry is valid */
  isValid: boolean;
  /** Query text */
  query: string;
  /** Validation errors */
  errors?: string[];
  /** Validation warnings */
  warnings?: string[];
  /** Suggestions */
  suggestions?: string[];
}

/**
 * Search history export
 */
export interface SearchHistoryExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  query: SearchHistoryQuery;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Search history aggregation
 */
export interface SearchHistoryAggregation {
  /** Time bucket */
  bucket: string;
  /** Total searches */
  total: number;
  /** Successful searches */
  successful: number;
  /** Searches with clicks */
  withClicks: number;
  /** Average results */
  avgResults: number;
  /** Total clicks */
  totalClicks: number;
  /** Click-through rate */
  ctr: number;
}

/**
 * Search history recommendation
 */
export interface SearchHistoryRecommendation {
  /** Recommended query */
  query: string;
  /** Recommendation score */
  score: number;
  /** Recommendation type */
  type: 'popular' | 'related' | 'personalized';
  /** Metadata */
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything (শুধুমাত্র নতুন টাইপ)
// ============================================================

export {
  // Search Core
  SearchType,
  SearchMode,
  SearchLanguage,
  SearchRegion,
};
