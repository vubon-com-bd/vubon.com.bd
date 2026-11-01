export interface InsuranceStatsResponseDTO {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly totalInsured: number;
  readonly totalPremium: number;
  readonly currency: string;
  readonly claimCount: number;
  readonly claimRate: number;
  readonly generatedAt: string;
}
