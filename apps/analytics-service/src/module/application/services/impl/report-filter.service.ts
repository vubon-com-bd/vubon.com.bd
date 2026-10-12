/**
 * Report Filter Service Implementation
 */
import { BaseService } from '@vubon/shared-kernel/application/services';
import type { ReportFilterEntity } from '../../../domain/entities/report-filter.entity.js';
import type { ReportFilterRepository } from '../../../domain/repositories/report-filter.repository.interface.js';
import { ReportIdVO } from '../../../domain/value-objects/primitives/report-id.vo.js';
import type { IReportFilterService } from '../interfaces/report-filter.service.interface.js';

export class ReportFilterService extends BaseService<ReportFilterEntity, string> implements IReportFilterService {
  readonly name = 'ReportFilterService';

  constructor(private readonly repository: ReportFilterRepository) {
    super();
  }

  async findByReportId(reportId: string): Promise<readonly ReportFilterEntity[]> {
    return this.repository.findByReportId(ReportIdVO.create(reportId));
  }

  async deleteByReportId(reportId: string): Promise<number> {
    return this.repository.deleteByReportId(ReportIdVO.create(reportId));
  }
}
