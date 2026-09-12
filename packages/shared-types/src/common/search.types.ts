import { SEARCH } from '@vubon/shared-constants/src/common/search.constants';
import { Filter } from './filter.types';
import { Sort } from './sort.types';

/**
 * Search query interface
 */
export interface SearchQuery {
  query?: string;
  filters?: Filter[];
  sort?: Sort[];
  fields?: string[];
  limit?: number;
  offset?: number;
}

/**
 * Search type — keys of SEARCH constant
 */
export type SearchType = keyof typeof SEARCH;
