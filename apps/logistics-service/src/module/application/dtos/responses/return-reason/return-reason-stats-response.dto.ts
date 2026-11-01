export interface ReturnReasonStatsResponseDTO {
  readonly total: number;
  readonly activeCount: number;
  readonly byCategory: Readonly<Record<string, number>>;
  readonly generatedAt: string;
}
