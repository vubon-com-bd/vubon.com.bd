import { PaginationParams } from '../../common/pagination.types';
import { SearchFilter } from './search-filter.types';
import { SearchSort } from './search-sort.types';
import { SearchOperator } from './search-operator.types';
import { SearchMatch } from './search-match.types';

export interface SearchRequest {
  query: string;
  filters?: SearchFilter[];
  sorts?: SearchSort[];
  operators?: SearchOperator[];
  matches?: SearchMatch[];
  pagination: PaginationParams;
  fields?: string[];
  highlight?: boolean;
  fuzzy?: boolean;
  minScore?: number;
}
