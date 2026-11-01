/**
 * Search Sort Value Types
 * @module shared-types/platform/search
 */

import type { SEARCH_SORT, SEARCH_SORT_ORDER } from '@vubon/shared-constants/platform';

export type SearchSortValue = (typeof SEARCH_SORT)[keyof typeof SEARCH_SORT];

export type SearchSortOrderValue = (typeof SEARCH_SORT_ORDER)[keyof typeof SEARCH_SORT_ORDER];

export interface SearchSort {
  readonly field: string;
  readonly order: SearchSortOrderValue;
}

export interface SearchSortMetadata {
  readonly value: SearchSortValue;
  readonly label: string;
  readonly defaultOrder: SearchSortOrderValue;
}
