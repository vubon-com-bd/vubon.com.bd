/**
 * Search Core Types
 * @module shared-types/platform/search
 *
 * Search entity + aggregator।
 */

import type { BaseEntity } from '../../common/base';
import type { UserId } from '../../common/primitives';
import type { SearchTypeValue, SearchScopeValue } from './search-type.types';
import type { SearchSort } from './search-sort.types';
import type { SearchFilter } from './search-filter.types';
import type { SearchMatch } from './search-match.types';
import type { SearchBoost } from './search-boost.types';
import type { Facet } from './facet.types';

export interface SearchRequest {
  readonly query: string;
  readonly type?: SearchTypeValue;
  readonly scope?: SearchScopeValue;
  readonly fields?: readonly string[];
  readonly filters?: readonly SearchFilter[];
  readonly sorts?: readonly SearchSort[];
  readonly boosts?: readonly SearchBoost[];
  readonly matches?: readonly SearchMatch[];
  readonly facets?: readonly string[];
  readonly page?: number;
  readonly limit?: number;
  readonly cursor?: string;
  readonly userId?: UserId;
  readonly sessionId?: string;
}

export interface SearchResult<T = unknown> {
  readonly items: readonly T[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
  readonly hasNext: boolean;
  readonly hasPrev: boolean;
  readonly query: string;
  readonly took: number;
  readonly maxScore?: number;
  readonly facets?: readonly Facet[];
  readonly suggestions?: readonly string[];
  readonly cached: boolean;
}

export interface SearchResultItem<T = unknown> {
  readonly item: T;
  readonly score: number;
  readonly highlights?: Readonly<Record<string, readonly string[]>>;
  readonly matchedFields?: readonly string[];
}

export interface Search extends BaseEntity<string> {
  readonly query: string;
  readonly type: SearchTypeValue;
  readonly scope: SearchScopeValue;
  readonly userId?: UserId;
  readonly sessionId?: string;
  readonly resultCount: number;
  readonly took: number;
  readonly filters?: readonly SearchFilter[];
  readonly sorts?: readonly SearchSort[];
  readonly page: number;
  readonly limit: number;
  readonly hasResults: boolean;
  readonly clickedResultId?: string;
  readonly clickedAt?: string;
  readonly searchedAt: string;
}

export interface SearchPublic {
  readonly query: string;
  readonly type: SearchTypeValue;
  readonly scope: SearchScopeValue;
  readonly resultCount: number;
  readonly took: number;
  readonly hasResults: boolean;
}

export interface SearchListFilter {
  readonly userId?: UserId;
  readonly type?: SearchTypeValue;
  readonly scope?: SearchScopeValue;
  readonly hasResults?: boolean;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly query?: string;
}
