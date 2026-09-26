import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { AnalyticsReportEntity } from '../../../domain/entities/analytics-report.entity';
import type { AiAnalyticsIdVO } from '../../../domain/value-objects/primitives/ai-analytics-id.vo';

export interface AnalyticsReportServiceInterface
  extends BaseServiceInterface<AnalyticsReportEntity, AiAnalyticsIdVO> {
  findByAnalyticsId(analyticsId: string): Promise<AnalyticsReportEntity | null>;
  generate(type: string, periodStart: Date, periodEnd: Date): Promise<AnalyticsReportEntity>;
}
