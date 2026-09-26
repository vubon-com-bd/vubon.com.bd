export interface ForecastDataPointResponseDTO {
  readonly timestamp: string;
  readonly value: number;
  readonly confidenceLower: number;
  readonly confidenceUpper: number;
}

export interface ForecastResponseDTO {
  readonly id: string;
  readonly target: string;
  readonly model: string;
  readonly horizonDays: number;
  readonly points: readonly ForecastDataPointResponseDTO[];
  readonly generatedAt: string;
}
