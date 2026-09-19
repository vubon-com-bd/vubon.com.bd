export interface FacetValue {
  readonly value: string;
  readonly count: number;
}

export interface Facet {
  readonly field: string;
  readonly values: readonly FacetValue[];
}

export interface FacetRequest {
  readonly q?: string;
  readonly fields: readonly string[];
}

export interface FacetResponse {
  readonly facets: readonly Facet[];
}
