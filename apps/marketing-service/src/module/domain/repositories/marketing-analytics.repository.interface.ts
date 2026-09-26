import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { MarketingAnalyticsEntity } from '../entities/marketing-analytics.entity';
import { AnalyticsMetricVO } from '../value-objects/primitives/analytics-metric.vo';

export interface MarketingAnalyticsRepository
  extends BaseRepository<MarketingAnalyticsEntity, string> {
  findByMetric(metric: AnalyticsMetricVO): Promise<readonly MarketingAnalyticsEntity[]>;
}
