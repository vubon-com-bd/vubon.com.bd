export interface RecommendationItemResponseDTO {
  readonly productId: string;
  readonly score: number;
  readonly rank: number;
  readonly reason: string | null;
}

export interface RecommendationResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly type: string;
  readonly strategy: string;
  readonly status: string;
  readonly items: readonly RecommendationItemResponseDTO[];
  readonly generatedAt: string;
}
