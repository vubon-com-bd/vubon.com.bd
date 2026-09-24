import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ReportFilterEntity } from '../entities/report-filter.entity';
import { ReportIdVO } from '../value-objects/primitives/report-id.vo';

export interface ReportFilterRepository
  extends BaseRepository<ReportFilterEntity, string> {
  findByReportId(reportId: ReportIdVO): Promise<readonly ReportFilterEntity[]>;
}
