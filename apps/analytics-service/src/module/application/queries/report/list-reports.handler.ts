import { ReportService } from '../../services/impl/report.service.js';
import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries';
import { ListReportsQuery } from './list-reports.query.js';
import type { ReportResponseData } from '../../dtos/responses/report-response.dto.js';

@Injectable()
@QueryHandler(ListReportsQuery)
export class ListReportsHandler extends BaseQueryHandler<ListReportsQuery, readonly ReportResponseData[]>
  implements IQueryHandler<ListReportsQuery> {
  readonly queryType = 'analytics.report.list';
  constructor(private readonly service: ReportService) { super(); }
  async execute(query: ListReportsQuery): Promise<readonly ReportResponseData[]> {
    return this.service.listByOwner(query.ownerId);
  }
}
