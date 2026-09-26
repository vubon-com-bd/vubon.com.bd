/**
 * Facet Types
 * @module shared-types/platform/search
 */

import type { FACET_TYPE, FACET_FIELD, FACET_SORT } from '@vubon/shared-constants/platform';

export type FacetTypeValue = (typeof FACET_TYPE)[keyof typeof FACET_TYPE];

export type FacetFieldValue = (typeof FACET_FIELD)[keyof typeof FACET_FIELD];

export type FacetSortValue = (typeof FACET_SORT)[keyof typeof FACET_SORT];

export interface Facet {
  readonly field: FacetFieldValue | string;
  readonly type: FacetTypeValue;
  readonly label: string;
  readonly values: readonly FacetValue[];
  readonly sort?: FacetSortValue;
  readonly multiselect: boolean;
}

export interface FacetValue {
  readonly value: string;
  readonly count: number;
  readonly selected: boolean;
  readonly from?: number;
  readonly to?: number;
}

export interface FacetRequest {
  readonly fields: readonly string[];
  readonly query?: string;
  readonly maxValues?: number;
}

export interface FacetResponse {
  readonly facets: readonly Facet[];
  readonly took: number;
}
