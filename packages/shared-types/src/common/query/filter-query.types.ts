/**
 * Filter Query Types
 * @module shared-types/common/query
 *
 * Values আসে shared-constants/common/filter.constants থেকে।
 */

import type { FILTER_LOGIC, FILTER_OPERATOR } from '@vubon/shared-constants/common';

export type FilterOperatorValue = (typeof FILTER_OPERATOR)[keyof typeof FILTER_OPERATOR];

export type FilterLogicValue = (typeof FILTER_LOGIC)[keyof typeof FILTER_LOGIC];

export interface FilterCondition<TValue = unknown> {
  readonly field: string;
  readonly operator: FilterOperatorValue;
  readonly value: TValue;
}

export interface FilterGroup {
  readonly logic: FilterLogicValue;
  readonly conditions: readonly (FilterCondition | FilterGroup)[];
}

export type FilterQuery = FilterCondition | FilterGroup;

export interface RangeFilter<TValue = number> {
  readonly field: string;
  readonly min?: TValue;
  readonly max?: TValue;
}

export interface InFilter<TValue = string> {
  readonly field: string;
  readonly values: readonly TValue[];
}
