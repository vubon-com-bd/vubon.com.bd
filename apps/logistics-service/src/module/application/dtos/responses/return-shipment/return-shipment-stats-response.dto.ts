export interface ReturnShipmentStatsResponseDTO {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly totalRefunded: number;
  readonly currency: string;
  readonly averageRefund: number;
  readonly generatedAt: string;
}
