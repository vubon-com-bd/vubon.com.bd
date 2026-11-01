export interface FulfillmentStatsResponseDTO {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly byPriority: Readonly<Record<string, number>>;
  readonly averageItemCount: number;
  readonly slaBreachedCount: number;
  readonly generatedAt: string;
}
