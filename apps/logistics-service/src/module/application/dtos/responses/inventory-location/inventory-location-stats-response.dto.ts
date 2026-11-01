export interface InventoryLocationStatsResponseDTO {
  readonly total: number;
  readonly byZone: Readonly<Record<string, number>>;
  readonly activeCount: number;
  readonly pickableCount: number;
  readonly quarantineCount: number;
  readonly generatedAt: string;
}
