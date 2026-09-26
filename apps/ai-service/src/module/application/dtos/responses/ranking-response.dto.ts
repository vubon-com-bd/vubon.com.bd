export interface RankedItemResponseDTO {
  readonly productId: string;
  readonly rank: number;
  readonly score: number;
  readonly features: Readonly<Record<string, number>>;
}

export interface RankingResponseDTO {
  readonly id: string;
  readonly algorithm: string;
  readonly items: readonly RankedItemResponseDTO[];
  readonly generatedAt: string;
}
