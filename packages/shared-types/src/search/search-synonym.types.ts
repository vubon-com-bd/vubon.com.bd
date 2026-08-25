/**
 * Search Synonym Types
 * Type definitions for search synonyms based on shared-constants
 * @module SearchSynonymTypes
 */

import { Metadata } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants search synonym
// ============================================================
import {
  // Synonym Constants
  SEARCH_SYNONYM,
  SearchSynonymType,
  SearchSynonymFormat,
  SearchSynonymScope,
  SearchSynonymRelation,
  SearchSynonymDefault,
  SearchSynonymLimit,
  searchSynonymGetTypeLabel,
  searchSynonymGetFormatLabel,
  searchSynonymGetScopeLabel,
  searchSynonymGetRelationLabel,
  searchSynonymIsEquivalentType,
  searchSynonymIsOneWayType,
  searchSynonymIsMultiWayType,
  searchSynonymIsContextualType,
  searchSynonymGetMaxSynonyms,
  searchSynonymGetMaxSynonymGroup,
  searchSynonymIsCaseSensitive,
  searchSynonymShouldExpand,
} from '@vubon/shared-constants';

// ============================================================
// Search Synonym Types
// ============================================================

/**
 * Search synonym
 */
export interface SearchSynonym {
  /** Synonym text */
  text: string;
  /** Synonym type */
  type: SearchSynonymType;
  /** Synonym format */
  format: SearchSynonymFormat;
  /** Synonym scope */
  scope: SearchSynonymScope;
  /** Synonym relation */
  relation: SearchSynonymRelation;
  /** Is equivalent */
  isEquivalent: boolean;
  /** Is one-way */
  isOneWay: boolean;
  /** Is multi-way */
  isMultiWay: boolean;
  /** Is contextual */
  isContextual: boolean;
  /** Context (for contextual synonyms) */
  context?: string;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Synonym group
 */
export interface SearchSynonymGroup {
  /** Group ID */
  id: string;
  /** Group name */
  name: string;
  /** Synonyms in the group */
  synonyms: SearchSynonym[];
  /** Group scope */
  scope: SearchSynonymScope;
  /** Is active */
  isActive: boolean;
  /** Metadata */
  metadata?: Metadata;
}

/**
 * Synonym request
 */
export interface SearchSynonymRequest {
  /** Query text */
  text: string;
  /** Synonym type */
  type?: SearchSynonymType;
  /** Synonym format */
  format?: SearchSynonymFormat;
  /** Synonym scope */
  scope?: SearchSynonymScope;
  /** Context */
  context?: string;
}

/**
 * Synonym response
 */
export interface SearchSynonymResponse {
  /** Original text */
  original: string;
  /** Synonyms found */
  synonyms: SearchSynonym[];
  /** Expanded text */
  expandedText?: string;
  /** Total synonyms found */
  total: number;
}

/**
 * Synonym configuration
 */
export interface SearchSynonymConfiguration {
  /** Maximum synonyms per word */
  maxSynonyms: number;
  /** Maximum synonym group size */
  maxSynonymGroup: number;
  /** Default synonym type */
  defaultType: SearchSynonymType;
  /** Default synonym format */
  defaultFormat: SearchSynonymFormat;
  /** Default scope */
  defaultScope: SearchSynonymScope;
  /** Is case sensitive */
  isCaseSensitive: boolean;
  /** Should expand */
  shouldExpand: boolean;
  /** Enable caching */
  enableCache: boolean;
  /** Cache TTL in seconds */
  cacheTTL: number;
}

/**
 * Synonym validation
 */
export interface SearchSynonymValidation {
  /** Whether the synonym is valid */
  isValid: boolean;
  /** Synonym text */
  text: string;
  /** Validation errors */
  errors?: string[];
  /** Validation warnings */
  warnings?: string[];
  /** Suggestions */
  suggestions?: string[];
}

/**
 * Synonym statistics
 */
export interface SearchSynonymStatistics {
  /** Total synonyms */
  totalSynonyms: number;
  /** Synonyms by type */
  byType: Record<SearchSynonymType, number>;
  /** Synonyms by format */
  byFormat: Record<SearchSynonymFormat, number>;
  /** Synonyms by scope */
  byScope: Record<SearchSynonymScope, number>;
  /** Synonyms by relation */
  byRelation: Record<SearchSynonymRelation, number>;
  /** Total synonym groups */
  totalGroups: number;
  /** Average group size */
  avgGroupSize: number;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Synonym Constants
  SEARCH_SYNONYM,
  SearchSynonymType,
  SearchSynonymFormat,
  SearchSynonymScope,
  SearchSynonymRelation,
  SearchSynonymDefault,
  SearchSynonymLimit,
  searchSynonymGetTypeLabel,
  searchSynonymGetFormatLabel,
  searchSynonymGetScopeLabel,
  searchSynonymGetRelationLabel,
  searchSynonymIsEquivalentType,
  searchSynonymIsOneWayType,
  searchSynonymIsMultiWayType,
  searchSynonymIsContextualType,
  searchSynonymGetMaxSynonyms,
  searchSynonymGetMaxSynonymGroup,
  searchSynonymIsCaseSensitive,
  searchSynonymShouldExpand,
};
