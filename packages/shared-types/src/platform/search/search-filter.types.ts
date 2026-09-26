/**
 * Search Filter Value Types
 * @module shared-types/platform/search
 */

import type { SEARCH_FILTER_TYPE, SEARCH_FILTER_RANGE } from '@vubon/shared-constants/platform';

export type SearchFilterTypeValue = (typeof SEARCH_FILTER_TYPE)[keyof typeof SEARCH_FILTER_TYPE];

export type SearchFilterRangeValue = (typeof SEARCH_FILTER_RANGE)[keyof typeof SEARCH_FILTER_RANGE];

export interface SearchFilter {
  readonly field: string;
  readonly type: SearchFilterTypeValue;
  readonly value: unknown;
}

export interface SearchRangeFilter {
  readonly field: SearchFilterRangeValue;
  readonly min?: number;
  readonly max?: number;
}

export interface SearchTermsFilter {
  readonly field: string;
  readonly values: readonly (string | number | boolean)[];
}
