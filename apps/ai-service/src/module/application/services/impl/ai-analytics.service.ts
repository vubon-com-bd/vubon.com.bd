import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AiAnalyticsServiceInterface } from '../interfaces/ai-analytics.service.interface';
import type { AiAnalyticsRepository } from '../../../domain/repositories/ai-analytics.repository.interface';
import { AiAnalyticsEntity } from '../../../domain/entities/ai-analytics.entity';
import { AiAnalyticsIdVO } from '../../../domain/value-objects/primitives/ai-analytics-id.vo';
import { AnalyticsTypeVO } from '../../../domain/value-objects/primitives/analytics-type.vo';
import { AnalyticsReportVO } from '../../../domain/value-objects/composites/analytics-report.vo';

@Injectable()
export class AiAnalyticsService
  extends BaseService<AiAnalyticsEntity, AiAnalyticsIdVO>
  implements AiAnalyticsServiceInterface
{
  readonly name = 'AiAnalyticsService';

  constructor(private readonly analyticsRepo: AiAnalyticsRepository) {
    super();
  }

  async record(
    type: string,
    modelId: string | null,
    data: Readonly<Record<string, number>>,
  ): Promise<void> {
    const now = new Date();
    const report = AnalyticsReportVO.create({
      type: AnalyticsTypeVO.create(type),
      entries: Object.entries(data).map(([metric, value]) => ({
        metric: { value: metric } as never,
        value,
        unit: '',
      })),
      periodStart: now,
      periodEnd: now,
    });

    const entity = AiAnalyticsEntity.create({
      type: AnalyticsTypeVO.create(type),
      report,
      modelId,
    });

    await this.analyticsRepo.save(entity);
  }

  async findByType(type: string): Promise<readonly AiAnalyticsEntity[]> {
    return this.analyticsRepo.findByType(type);
  }

  async getUsageSummary(
    fromDate?: string,
    toDate?: string,
  ): Promise<{ readonly totalCalls: number; readonly totalTokens: number; readonly totalCost: number }> {
    void fromDate;
    void toDate;
    const all = await this.analyticsRepo.findAll();
    let totalTokens = 0;
    for (const entry of all) {
      for (const e of entry.report.entries) {
        if (e.metric.value === 'tokens') totalTokens += e.value;
      }
    }
    return {
      totalCalls: all.length,
      totalTokens,
      totalCost: totalTokens * 0.00002,
    };
  }
}
