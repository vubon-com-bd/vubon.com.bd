export interface DispatchStatsResponseDTO {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly totalShipments: number;
  readonly averageShipmentsPerDispatch: number;
  readonly generatedAt: string;
}
