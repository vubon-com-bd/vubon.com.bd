import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListReportsQuery } from './list-reports.query';
import type { MarketingReportServiceInterface } from '../../services/interfaces/marketing-report.service.interface';
import type { MarketingReportResponseDTO } from '../../dtos/responses/marketing-report-response.dto';

@QueryHandler(ListReportsQuery)
export class ListReportsHandler
  extends BaseQueryHandler<ListReportsQuery, readonly MarketingReportResponseDTO[]>
  implements IQueryHandler<ListReportsQuery> {
  readonly queryType = 'marketing.report.list';
  constructor(private readonly service: MarketingReportServiceInterface) { super(); }
  async execute(query: ListReportsQuery): Promise<readonly MarketingReportResponseDTO[]> {
    if (!query.reportType) return [];
    return this.service.findByType(query.reportType);
  }
}
