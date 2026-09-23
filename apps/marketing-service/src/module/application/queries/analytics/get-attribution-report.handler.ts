import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetAttributionReportQuery } from './get-attribution-report.query';

export interface AttributionReportResult {
  readonly model: string;
  readonly attribution: Readonly<Record<string, number>>;
}

@QueryHandler(GetAttributionReportQuery)
export class GetAttributionReportHandler
  extends BaseQueryHandler<GetAttributionReportQuery, AttributionReportResult>
  implements IQueryHandler<GetAttributionReportQuery>
{
  readonly queryType = 'marketing.analytics.attribution';

  async execute(query: GetAttributionReportQuery): Promise<AttributionReportResult> {
    return { model: query.model, attribution: {} };
  }
}
