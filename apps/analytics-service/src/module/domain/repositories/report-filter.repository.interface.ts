/**
 * Report Filter Repository Interface
 * @module analytics-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base';
import type { ReportFilterEntity } from '../entities/report-filter.entity.js';
import type { ReportIdVO } from '../value-objects/primitives/report-id.vo.js';

export interface ReportFilterRepository extends BaseRepository<ReportFilterEntity, string> {
  findByReportId(reportId: ReportIdVO): Promise<readonly ReportFilterEntity[]>;
  deleteByReportId(reportId: ReportIdVO): Promise<number>;
  existsByReportId(reportId: ReportIdVO): Promise<boolean>;
}
