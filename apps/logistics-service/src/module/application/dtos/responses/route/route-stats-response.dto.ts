export interface RouteStatsResponseDTO {
  readonly total: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly totalDistanceKm: number;
  readonly totalStops: number;
  readonly averageStopsPerRoute: number;
  readonly generatedAt: string;
}
