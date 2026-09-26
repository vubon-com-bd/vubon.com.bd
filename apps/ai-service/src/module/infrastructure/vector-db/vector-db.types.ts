export interface VectorRecord {
  readonly id: string;
  readonly values: readonly number[];
  readonly metadata?: Readonly<Record<string, string | number | boolean>>;
}

export interface VectorSearchInput {
  readonly vector: readonly number[];
  readonly topK: number;
  readonly threshold?: number;
  readonly filter?: Readonly<Record<string, string | number | boolean>>;
}

export interface VectorSearchMatch {
  readonly id: string;
  readonly score: number;
  readonly metadata?: Readonly<Record<string, string | number | boolean>>;
}

export interface VectorSearchOutput {
  readonly matches: readonly VectorSearchMatch[];
  readonly tookMs: number;
}

export interface VectorIndexConfig {
  readonly name: string;
  readonly dimension: number;
  readonly metric: 'cosine' | 'euclidean' | 'dot';
}

export interface VectorUpsertOutput {
  readonly upsertedCount: number;
  readonly tookMs: number;
}
