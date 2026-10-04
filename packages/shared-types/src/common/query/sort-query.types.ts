/**
 * Sort Query Types
 * @module shared-types/common/query
 *
 * Values আসে shared-constants/common/sort.constants থেকে।
 */

import type { SORT_ORDER } from '@vubon/shared-constants/common';

export type SortOrderValue = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];

export interface SortQuery<TField extends string = string> {
  readonly field: TField;
  readonly order: SortOrderValue;
}

export interface MultiSortQuery<TField extends string = string> {
  readonly sorts: readonly SortQuery<TField>[];
}

export type SortQueryInput<TField extends string = string> =
  SortQuery<TField> | readonly SortQuery<TField>[];
