export interface VehicleStatsResponseDTO {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly byFuelType: Readonly<Record<string, number>>;
  readonly availableCount: number;
  readonly inUseCount: number;
  readonly generatedAt: string;
}
