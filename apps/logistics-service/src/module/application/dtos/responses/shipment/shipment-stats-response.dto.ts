/**
 * ShipmentStatsResponseDTO — Dashboard metrics
 * @module logistics-service/application/dtos/responses/shipment
 */
export interface ShipmentStatsResponseDTO {
  readonly total: number;
  readonly totalRevenue: number;
  readonly totalCOD: number;
  readonly currency: string;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly byPriority: Readonly<Record<string, number>>;
  readonly averageWeightKg: number;
  readonly averageItemCount: number;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly generatedAt: string;
}
