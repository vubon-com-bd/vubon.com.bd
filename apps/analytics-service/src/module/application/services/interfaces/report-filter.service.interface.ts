/**
 * Report Filter Service Interface
 * @module analytics-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services';
import type { ReportFilterEntity } from '../../../domain/entities/report-filter.entity.js';

export interface IReportFilterService extends BaseServiceInterface<ReportFilterEntity, string> {
  findByReportId(reportId: string): Promise<readonly ReportFilterEntity[]>;
  deleteByReportId(reportId: string): Promise<number>;
}
