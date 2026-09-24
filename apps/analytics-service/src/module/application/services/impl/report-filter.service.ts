import { Injectable } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import { ReportFilterEntity } from '../../../domain/entities/report-filter.entity';
import { ReportIdVO } from '../../../domain/value-objects/primitives/report-id.vo';
import type { ReportFilterRepository } from '../../../domain/repositories/report-filter.repository.interface';
import type { ReportFilterServiceInterface } from '../interfaces/report-filter.service.interface';

@Injectable()
export class ReportFilterService
  extends BaseService<ReportFilterEntity, string>
  implements ReportFilterServiceInterface
{
  readonly name = 'ReportFilterService';

  constructor(private readonly repo: ReportFilterRepository) {
    super();
  }

  async findByReportId(reportId: string): Promise<readonly ReportFilterEntity[]> {
    return this.repo.findByReportId(ReportIdVO.create(reportId));
  }
}
