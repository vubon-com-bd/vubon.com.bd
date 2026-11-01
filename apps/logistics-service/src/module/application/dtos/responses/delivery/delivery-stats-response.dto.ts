export interface DeliveryStatsResponseDTO {
  readonly total: number;
  readonly totalDelivered: number;
  readonly totalFailed: number;
  readonly successRate: number;
  readonly averageAttempts: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly generatedAt: string;
}
