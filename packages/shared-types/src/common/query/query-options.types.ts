/**
 * Query Options Types
 * @module shared-types/common/query
 *
 * Composite query options — pagination + sort + filter একসাথে।
 */

import type { PaginationQuery } from './pagination-query.types';
import type { SortQuery } from './sort-query.types';
import type { FilterQuery } from './filter-query.types';
import type { SearchQuery } from './search-query.types';

export interface QueryOptions<TField extends string = string> {
  readonly pagination?: PaginationQuery;
  readonly sort?: SortQuery<TField> | readonly SortQuery<TField>[];
  readonly filter?: FilterQuery | readonly FilterQuery[];
  readonly search?: SearchQuery;
  readonly includes?: readonly string[];
  readonly select?: readonly string[];
  readonly includeDeleted?: boolean;
}

export interface FindOptions<TField extends string = string> extends QueryOptions<TField> {
  readonly distinct?: boolean;
  readonly cache?: boolean;
  readonly cacheTtl?: number;
}

export interface CountOptions {
  readonly filter?: FilterQuery | readonly FilterQuery[];
  readonly search?: SearchQuery;
}
