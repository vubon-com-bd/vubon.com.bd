export type InsightSeverity = 'info' | 'warning' | 'critical';
export type InsightKind = 'anomaly' | 'trend' | 'opportunity' | 'risk' | 'summary';

export interface AiInsight {
  readonly id: string;
  readonly kind: InsightKind;
  readonly severity: InsightSeverity;
  readonly title: string;
  readonly description: string;
  readonly data?: Record<string, unknown>;
  readonly createdAt: string;
}

export interface AiInsightListResponse {
  readonly insights: readonly AiInsight[];
  readonly total: number;
}
