import { BaseEntity } from '../../common/base.types';
import { User } from '../../user/user.types';
import { Product } from '../../business/product/product.types';
import { PLATFORM_SEARCH } from '@vubon/shared-constants/src/platform/search/search.constants';
import { SearchFilter } from './search-filter.types';
import { SearchSort } from './search-sort.types';
import { SearchOperator } from './search-operator.types';
import { SearchMatch } from './search-match.types';
import { SearchBoost } from './search-boost.types';

export interface SearchMetadata {
  ipAddress?: string;
  userAgent?: string;
  deviceId?: string;
  sessionId?: string;
  location?: string;
  language?: string;
  timezone?: string;
}

export interface Search extends BaseEntity {
  searchId: string;
  query: string;
  type: keyof typeof PLATFORM_SEARCH.SEARCH_TYPES | string;
  filters: SearchFilter[];
  sorts: SearchSort[];
  operators: SearchOperator[];
  matches: SearchMatch[];
  boosts: SearchBoost[];
  results: Product[];
  resultCount: number;
  totalResults: number;
  page: number;
  limit: number;
  took: number;
  userId?: string;
  user?: User;
  status: keyof typeof PLATFORM_SEARCH.STATUS | string;
  isActive: boolean;
  metadata: SearchMetadata;
}
