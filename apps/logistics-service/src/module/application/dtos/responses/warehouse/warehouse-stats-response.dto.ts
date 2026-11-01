export interface WarehouseStatsResponseDTO {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly totalCapacityM3: number;
  readonly totalUsedM3: number;
  readonly utilizationPercent: number;
  readonly generatedAt: string;
}
