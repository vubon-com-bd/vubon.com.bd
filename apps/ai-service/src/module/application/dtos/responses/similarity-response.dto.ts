export interface SimilarityMatchResponseDTO {
  readonly vectorId: string;
  readonly score: number;
}

export interface SimilarityResponseDTO {
  readonly id: string;
  readonly sourceVectorId: string;
  readonly metric: string;
  readonly threshold: number;
  readonly matches: readonly SimilarityMatchResponseDTO[];
  readonly computedAt: string;
}
