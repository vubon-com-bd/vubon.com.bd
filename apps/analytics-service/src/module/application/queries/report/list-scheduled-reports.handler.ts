import { ReportService } from '../../services/impl/report.service.js';
import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries';
import { ListScheduledReportsQuery } from './list-scheduled-reports.query.js';
import type { ReportResponseData } from '../../dtos/responses/report-response.dto.js';

@Injectable()
@QueryHandler(ListScheduledReportsQuery)
export class ListScheduledReportsHandler extends BaseQueryHandler<ListScheduledReportsQuery, readonly ReportResponseData[]>
  implements IQueryHandler<ListScheduledReportsQuery> {
  readonly queryType = 'analytics.report.list-scheduled';
  constructor(private readonly service: ReportService) { super(); }
  async execute(_query: ListScheduledReportsQuery): Promise<readonly ReportResponseData[]> {
    return this.service.listScheduled();
  }
}
