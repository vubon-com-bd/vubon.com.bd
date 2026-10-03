export interface ForecastPoint {
  readonly timestamp: string;
  readonly value: number;
  readonly lower?: number;
  readonly upper?: number;
}

export interface ForecastResponse {
  readonly metric: string;
  readonly horizon: string;
  readonly points: readonly ForecastPoint[];
  readonly modelId?: string;
  readonly generatedAt: string;
}
