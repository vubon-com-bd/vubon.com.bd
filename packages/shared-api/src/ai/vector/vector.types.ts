export interface VectorRecord {
  readonly id: string;
  readonly vector: readonly number[];
  readonly metadata?: Record<string, unknown>;
}

export interface VectorSearchRequest {
  readonly vector: readonly number[];
  readonly topK?: number;
  readonly filter?: Record<string, unknown>;
  readonly namespace?: string;
}

export interface VectorSearchHit {
  readonly id: string;
  readonly score: number;
  readonly metadata?: Record<string, unknown>;
}

export interface VectorSearchResponse {
  readonly hits: readonly VectorSearchHit[];
  readonly took: number;
}

export interface VectorUpsertRequest {
  readonly records: readonly VectorRecord[];
  readonly namespace?: string;
}
