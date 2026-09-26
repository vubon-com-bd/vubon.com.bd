/**
 * Search Query Types
 * @module shared-types/common/query
 *
 * Values আসে shared-constants/common/search-params.constants থেকে।
 */

import type { SEARCH_PARAMS } from '@vubon/shared-constants/common';

export type SearchDefaultLimit = typeof SEARCH_PARAMS.DEFAULT_RESULT_LIMIT;
export type SearchMaxLimit = typeof SEARCH_PARAMS.MAX_RESULT_LIMIT;

export interface SearchQuery {
  readonly q: string;
  readonly fields?: readonly string[];
  readonly fuzzy?: boolean;
  readonly highlight?: boolean;
  readonly limit?: number;
}

export interface AdvancedSearchQuery extends SearchQuery {
  readonly filters?: readonly string[];
  readonly sort?: readonly string[];
  readonly facets?: readonly string[];
  readonly suggestions?: boolean;
}
