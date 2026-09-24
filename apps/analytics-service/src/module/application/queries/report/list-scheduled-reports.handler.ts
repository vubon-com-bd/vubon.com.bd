import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListScheduledReportsQuery } from './list-scheduled-reports.query';
import type { ReportRepository } from '../../../domain/repositories/report.repository.interface';
import {
  type ReportResponseDTO,
  toReportResponse,
} from '../../dtos/responses';

@QueryHandler(ListScheduledReportsQuery)
export class ListScheduledReportsHandler
  extends BaseQueryHandler<ListScheduledReportsQuery, readonly ReportResponseDTO[]>
  implements IQueryHandler<ListScheduledReportsQuery>
{
  readonly queryType = 'analytics.report.list-scheduled';

  constructor(private readonly reportRepo: ReportRepository) {
    super();
  }

  async execute(
    query: ListScheduledReportsQuery,
  ): Promise<readonly ReportResponseDTO[]> {
    const entities = await this.reportRepo.findScheduledDue(
      new Date(query.beforeDate),
    );
    return entities.map((e) => toReportResponse(e));
  }
}
