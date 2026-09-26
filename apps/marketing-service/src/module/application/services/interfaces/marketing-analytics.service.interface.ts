import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { MarketingAnalyticsEntity } from '../../../domain/entities/marketing-analytics.entity';
import type { MarketingAnalyticsResponseDTO } from '../../dtos/responses/marketing-analytics-response.dto';

export interface MarketingAnalyticsServiceInterface
  extends BaseServiceInterface<MarketingAnalyticsEntity, string> {
  record(metric: string, value: number): Promise<void>;
  findByMetric(metric: string): Promise<readonly MarketingAnalyticsResponseDTO[]>;
}
