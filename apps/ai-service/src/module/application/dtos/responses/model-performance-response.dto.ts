export interface ModelPerformanceResponseDTO {
  readonly modelId: string;
  readonly accuracy: number | null;
  readonly precision: number | null;
  readonly recall: number | null;
  readonly f1Score: number | null;
  readonly latencyMs: number | null;
  readonly sampleCount: number;
  readonly recordedAt: string;
}
