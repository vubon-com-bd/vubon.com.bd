export interface CourierStatsResponseDTO {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly codEnabled: number;
  readonly insuranceEnabled: number;
  readonly internationalEnabled: number;
  readonly apiEnabledCount: number;
  readonly generatedAt: string;
}
