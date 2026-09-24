import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { ReportFilterEntity } from '../../../domain/entities/report-filter.entity';

export interface ReportFilterServiceInterface
  extends BaseServiceInterface<ReportFilterEntity, string> {
  findByReportId(reportId: string): Promise<readonly ReportFilterEntity[]>;
}
