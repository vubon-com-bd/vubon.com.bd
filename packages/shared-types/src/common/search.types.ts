import { SEARCH } from '@vubon/shared-constants';
import { Filter } from './filter.types';
import { Sort } from './sort.types';

export interface SearchQuery {
  query?: string;
  filters?: Filter[];
  sort?: Sort[];
  fields?: string[];
  limit?: number;
  offset?: number;
}

export type SearchType = keyof typeof SEARCH;
