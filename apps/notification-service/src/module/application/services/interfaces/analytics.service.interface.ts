/**
 * IAnalyticsService — contract
 * @module notification-service/application/services/interfaces
 */
import type {
  AnalyticsOverviewResponseDTO,
  AnalyticsTimeSeriesResponseDTO,
  ChannelPerformanceResponseDTO,
  AnalyticsReportResponseDTO,
} from '../../dtos/responses/analytics-response.dto.js';

export const ANALYTICS_SERVICE = Symbol('ANALYTICS_SERVICE');

export interface AnalyticsOverviewRequestDTO {
  readonly userId?: string;
  readonly fromDate: string;
  readonly toDate: string;
  readonly channel?: string;
  readonly category?: string;
}

export interface AnalyticsTimeSeriesRequestDTO {
  readonly userId?: string;
  readonly fromDate: string;
  readonly toDate: string;
  readonly interval: 'hour' | 'day' | 'week' | 'month';
  readonly channel?: string;
}

export interface AnalyticsReportRequestDTO {
  readonly reportType: string;
  readonly format: 'pdf' | 'csv' | 'xlsx' | 'json' | 'html';
  readonly fromDate: string;
  readonly toDate: string;
  readonly userId?: string;
}

export interface IAnalyticsService {
  overview(dto: AnalyticsOverviewRequestDTO): Promise<AnalyticsOverviewResponseDTO>;
  timeSeries(dto: AnalyticsTimeSeriesRequestDTO): Promise<AnalyticsTimeSeriesResponseDTO>;
  channelPerformance(
    fromDate: string,
    toDate: string,
  ): Promise<readonly ChannelPerformanceResponseDTO[]>;
  generateReport(dto: AnalyticsReportRequestDTO, actorId?: string): Promise<AnalyticsReportResponseDTO>;
}
