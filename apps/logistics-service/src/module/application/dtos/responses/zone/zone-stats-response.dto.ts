export interface ZoneStatsResponseDTO {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly codEnabledCount: number;
  readonly remoteCount: number;
  readonly generatedAt: string;
}
