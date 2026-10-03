export interface EmbeddingCreateRequest {
  readonly input: string | readonly string[];
  readonly modelId?: string;
}

export interface EmbeddingVector {
  readonly index: number;
  readonly vector: readonly number[];
}

export interface EmbeddingCreateResponse {
  readonly vectors: readonly EmbeddingVector[];
  readonly modelId: string;
  readonly dimensions: number;
  readonly usage?: { readonly totalTokens: number };
}
