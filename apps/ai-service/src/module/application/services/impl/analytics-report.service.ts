import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AnalyticsReportServiceInterface } from '../interfaces/analytics-report.service.interface';
import type { AnalyticsReportRepository } from '../../../domain/repositories/analytics-report.repository.interface';
import { AnalyticsReportEntity } from '../../../domain/entities/analytics-report.entity';
import { AiAnalyticsIdVO } from '../../../domain/value-objects/primitives/ai-analytics-id.vo';
import { AnalyticsReportVO } from '../../../domain/value-objects/composites/analytics-report.vo';
import { AnalyticsTypeVO } from '../../../domain/value-objects/primitives/analytics-type.vo';

@Injectable()
export class AnalyticsReportService
  extends BaseService<AnalyticsReportEntity, AiAnalyticsIdVO>
  implements AnalyticsReportServiceInterface
{
  readonly name = 'AnalyticsReportService';

  constructor(private readonly reportRepo: AnalyticsReportRepository) {
    super();
  }

  async findByAnalyticsId(analyticsId: string): Promise<AnalyticsReportEntity | null> {
    return this.reportRepo.findByAnalyticsId(AiAnalyticsIdVO.create(analyticsId));
  }

  async generate(
    type: string,
    periodStart: Date,
    periodEnd: Date,
  ): Promise<AnalyticsReportEntity> {
    const report = AnalyticsReportVO.create({
      type: AnalyticsTypeVO.create(type),
      entries: [],
      periodStart,
      periodEnd,
    });

    const entity = AnalyticsReportEntity.create({ report });
    await this.reportRepo.save(entity);
    return entity;
  }
}
