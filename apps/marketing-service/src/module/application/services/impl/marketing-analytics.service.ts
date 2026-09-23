import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { MarketingAnalyticsServiceInterface } from '../interfaces/marketing-analytics.service.interface';
import type { MarketingAnalyticsRepository } from '../../../domain/repositories/marketing-analytics.repository.interface';
import { MarketingAnalyticsEntity } from '../../../domain/entities/marketing-analytics.entity';
import { AnalyticsMetricVO } from '../../../domain/value-objects/primitives/analytics-metric.vo';
import { AnalyticsGranularityVO } from '../../../domain/value-objects/primitives/analytics-granularity.vo';
import type { MarketingAnalyticsResponseDTO } from '../../dtos/responses/marketing-analytics-response.dto';

@Injectable()
export class MarketingAnalyticsService
  extends BaseService<MarketingAnalyticsEntity, string>
  implements MarketingAnalyticsServiceInterface
{
  readonly name = 'MarketingAnalyticsService';

  constructor(private readonly repo: MarketingAnalyticsRepository) {
    super();
  }

  async record(metric: string, value: number): Promise<void> {
    const entity = MarketingAnalyticsEntity.create({
      metric: AnalyticsMetricVO.create(metric),
      value,
      granularity: AnalyticsGranularityVO.create('daily'),
      recordedAt: new Date(),
    });
    await this.repo.save(entity);
  }

  async findByMetric(metric: string): Promise<readonly MarketingAnalyticsResponseDTO[]> {
    const entities = await this.repo.findByMetric(AnalyticsMetricVO.create(metric));
    const result = entities.map((e) => ({
      metric: e.metric.value,
      value: e.value,
      granularity: e.granularity.value,
      recordedAt: e.recordedAt.toISOString(),
    }));
    return result as unknown as readonly MarketingAnalyticsResponseDTO[];
  }
}
