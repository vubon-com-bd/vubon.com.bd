/**
 * Analytics Response DTOs
 * @module notification-service/application/dtos/responses
 */

export interface AnalyticsOverviewResponseDTO {
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly totalSent: number;
  readonly totalDelivered: number;
  readonly totalFailed: number;
  readonly deliveryRate: number;
  readonly openRate: number;
  readonly clickRate: number;
  readonly unsubscribeRate: number;
  readonly byChannel: Readonly<Record<string, {
    readonly sent: number;
    readonly delivered: number;
    readonly failed: number;
  }>>;
}

export interface AnalyticsTimeSeriesPointDTO {
  readonly timestamp: string;
  readonly sent: number;
  readonly delivered: number;
  readonly failed: number;
  readonly opened: number;
  readonly clicked: number;
}

export interface AnalyticsTimeSeriesResponseDTO {
  readonly periodStart: string;
  readonly periodEnd: string;
  readonly interval: 'hour' | 'day' | 'week' | 'month';
  readonly points: readonly AnalyticsTimeSeriesPointDTO[];
}

export interface ChannelPerformanceResponseDTO {
  readonly channel: string;
  readonly sent: number;
  readonly delivered: number;
  readonly failed: number;
  readonly deliveryRate: number;
  readonly avgDeliveryMs: number;
}

export interface AnalyticsReportResponseDTO {
  readonly reportType: string;
  readonly format: string;
  readonly generatedAt: string;
  readonly data: Readonly<Record<string, unknown>>;
  readonly expiresAt?: string;
  readonly downloadUrl?: string;
}
