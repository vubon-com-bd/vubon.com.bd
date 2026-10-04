export interface SearchHit {
  readonly id: string;
  readonly type: string;
  readonly title: string;
  readonly snippet?: string;
  readonly score: number;
}

export interface SearchResponse {
  readonly hits: readonly SearchHit[];
  readonly total: number;
  readonly took: number;
}

export interface AutocompleteSuggestion {
  readonly text: string;
  readonly type: string;
  readonly score: number;
}

export interface FacetValue {
  readonly value: string;
  readonly count: number;
}

export interface Facet {
  readonly field: string;
  readonly values: readonly FacetValue[];
}
