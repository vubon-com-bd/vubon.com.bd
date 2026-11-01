export interface ShippingMethodStatsResponseDTO {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly codEnabledCount: number;
  readonly trackingEnabledCount: number;
  readonly generatedAt: string;
}
