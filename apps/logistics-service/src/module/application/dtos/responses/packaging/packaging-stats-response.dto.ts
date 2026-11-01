export interface PackagingStatsResponseDTO {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly totalStock: number;
  readonly outOfStockCount: number;
  readonly ecoFriendlyCount: number;
  readonly generatedAt: string;
}
