import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { AnalyticsReportEntity } from '../entities/analytics-report.entity';
import { AiAnalyticsIdVO } from '../value-objects/primitives/ai-analytics-id.vo';

export interface AnalyticsReportRepository
  extends BaseRepository<AnalyticsReportEntity, AiAnalyticsIdVO> {
  findByAnalyticsId(analyticsId: AiAnalyticsIdVO): Promise<AnalyticsReportEntity | null>;
  findInPeriod(start: Date, end: Date): Promise<readonly AnalyticsReportEntity[]>;
}
