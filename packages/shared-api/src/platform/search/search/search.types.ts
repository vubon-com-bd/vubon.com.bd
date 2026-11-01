export interface SearchRequest {
  readonly q: string;
  readonly page?: number;
  readonly limit?: number;
  readonly filters?: Record<string, unknown>;
  readonly sort?: string;
}

export interface SearchHit {
  readonly id: string;
  readonly type: string;
  readonly title: string;
  readonly snippet?: string;
  readonly score: number;
  readonly data?: Record<string, unknown>;
}

export interface SearchResponse {
  readonly hits: readonly SearchHit[];
  readonly total: number;
  readonly took: number;
}
