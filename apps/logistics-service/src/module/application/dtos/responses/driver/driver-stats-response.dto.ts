export interface DriverStatsResponseDTO {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly availableCount: number;
  readonly onDutyCount: number;
  readonly averageRating: number;
  readonly totalCashInHand: number;
  readonly generatedAt: string;
}
