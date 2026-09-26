export interface EmbeddingResponseDTO {
  readonly id: string;
  readonly sourceId: string;
  readonly sourceType: string;
  readonly type: string;
  readonly model: string;
  readonly dimension: number;
  readonly status: string;
  readonly createdAt: string;
}

export interface EmbeddingBatchResponseDTO {
  readonly success: true;
  readonly total: number;
  readonly generated: number;
  readonly failed: number;
  readonly embeddings: readonly EmbeddingResponseDTO[];
}
