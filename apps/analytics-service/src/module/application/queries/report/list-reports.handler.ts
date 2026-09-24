import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListReportsQuery } from './list-reports.query';
import type { ReportRepository } from '../../../domain/repositories/report.repository.interface';
import {
  type ReportResponseDTO,
  toReportResponse,
} from '../../dtos/responses';

@QueryHandler(ListReportsQuery)
export class ListReportsHandler
  extends BaseQueryHandler<ListReportsQuery, readonly ReportResponseDTO[]>
  implements IQueryHandler<ListReportsQuery>
{
  readonly queryType = 'analytics.report.list';

  constructor(private readonly reportRepo: ReportRepository) {
    super();
  }

  async execute(query: ListReportsQuery): Promise<readonly ReportResponseDTO[]> {
    const entities = await this.reportRepo.findByOwner(query.ownerId);
    return entities.map((e) => toReportResponse(e));
  }
}
