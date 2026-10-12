import { ReportService } from '../../services/impl/report.service.js';
import { Injectable } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries';
import { ApplicationNotFoundError } from '@vubon/shared-kernel/application/errors';
import { GetReportQuery } from './get-report.query.js';
import type { ReportResponseData } from '../../dtos/responses/report-response.dto.js';

@Injectable()
@QueryHandler(GetReportQuery)
export class GetReportHandler extends BaseQueryHandler<GetReportQuery, ReportResponseData>
  implements IQueryHandler<GetReportQuery> {
  readonly queryType = 'analytics.report.get';
  constructor(private readonly service: ReportService) { super(); }
  async execute(query: GetReportQuery): Promise<ReportResponseData> {
    const result = await this.service.findById(query.reportId);
    if (!result) throw new ApplicationNotFoundError('Report', query.reportId);
    return result;
  }
}
