import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetReportQuery } from './get-report.query';
import type { MarketingReportRepository } from '../../../domain/repositories/marketing-report.repository.interface';
import { MarketingReportIdVO } from '../../../domain/value-objects/primitives/marketing-report-id.vo';
import type { MarketingReportResponseDTO } from '../../dtos/responses/marketing-report-response.dto';
import { ReportMapper } from '../../mappers/report.mapper';

@QueryHandler(GetReportQuery)
export class GetReportHandler
  extends BaseQueryHandler<GetReportQuery, MarketingReportResponseDTO | null>
  implements IQueryHandler<GetReportQuery> {
  readonly queryType = 'marketing.report.get';
  constructor(
    private readonly repo: MarketingReportRepository,
    private readonly mapper: ReportMapper,
  ) { super(); }
  async execute(query: GetReportQuery): Promise<MarketingReportResponseDTO | null> {
    const entity = await this.repo.findById(MarketingReportIdVO.create(query.reportId));
    return entity ? this.mapper.toDTO(entity) : null;
  }
}
