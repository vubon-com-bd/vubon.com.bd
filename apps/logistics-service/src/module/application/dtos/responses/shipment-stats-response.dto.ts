/**
 * ShipmentStatsResponseDto — aggregate stats for dashboards
 * @module logistics-service/application/dtos/responses
 */
export interface ShipmentStatsResponseDto {
  readonly totalShipments: number;
  readonly inTransit: number;
  readonly delivered: number;
  readonly failed: number;
  readonly returned: number;
  readonly cancelled: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byPriority: Readonly<Record<string, number>>;
  readonly byCourier: Readonly<Record<string, number>>;
}
