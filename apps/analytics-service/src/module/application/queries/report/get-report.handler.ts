import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetReportQuery } from './get-report.query';
import type { ReportRepository } from '../../../domain/repositories/report.repository.interface';
import { ReportIdVO } from '../../../domain/value-objects/primitives/report-id.vo';
import { ReportNotFoundError } from '../../../domain/errors/report.errors';
import {
  type ReportResponseDTO,
  toReportResponse,
} from '../../dtos/responses';

@QueryHandler(GetReportQuery)
export class GetReportHandler
  extends BaseQueryHandler<GetReportQuery, ReportResponseDTO>
  implements IQueryHandler<GetReportQuery>
{
  readonly queryType = 'analytics.report.get';

  constructor(private readonly reportRepo: ReportRepository) {
    super();
  }

  async execute(query: GetReportQuery): Promise<ReportResponseDTO> {
    const entity = await this.reportRepo.findById(ReportIdVO.create(query.reportId));
    if (!entity) throw new ReportNotFoundError(query.reportId);
    return toReportResponse(entity);
  }
}
