/**
 * Search Synonym Types
 * @module shared-types/platform/search
 */

import type { SEARCH_SYNONYM_TYPE } from '@vubon/shared-constants/platform';

export type SearchSynonymTypeValue = (typeof SEARCH_SYNONYM_TYPE)[keyof typeof SEARCH_SYNONYM_TYPE];

export interface SearchSynonym {
  readonly id: string;
  readonly term: string;
  readonly synonyms: readonly string[];
  readonly type: SearchSynonymTypeValue;
  readonly language: string;
  readonly isActive: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface SearchSynonymInput {
  readonly term: string;
  readonly synonyms: readonly string[];
  readonly type: SearchSynonymTypeValue;
  readonly language: string;
}
