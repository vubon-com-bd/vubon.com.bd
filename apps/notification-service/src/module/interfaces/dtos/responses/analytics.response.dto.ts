export interface AnalyticsResponseDTO {
  readonly total: number;
  readonly delivered: number;
  readonly failed: number;
  readonly opened: number;
  readonly clicked: number;
  readonly successRate: number;
  readonly openRate: number;
  readonly clickRate: number;
}
