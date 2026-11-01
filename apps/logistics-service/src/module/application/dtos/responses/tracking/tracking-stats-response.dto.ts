export interface TrackingStatsResponseDTO {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly bySource: Readonly<Record<string, number>>;
  readonly averageEventCount: number;
  readonly generatedAt: string;
}
