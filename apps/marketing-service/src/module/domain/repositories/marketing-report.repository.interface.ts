import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { MarketingReportEntity } from '../entities/marketing-report.entity';
import { MarketingReportIdVO } from '../value-objects/primitives/marketing-report-id.vo';
import { ReportTypeVO } from '../value-objects/primitives/report-type.vo';

export interface MarketingReportRepository
  extends BaseRepository<MarketingReportEntity, MarketingReportIdVO> {
  findByType(type: ReportTypeVO): Promise<readonly MarketingReportEntity[]>;
}
