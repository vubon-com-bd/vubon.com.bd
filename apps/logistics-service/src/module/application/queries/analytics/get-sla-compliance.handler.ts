import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetSlaComplianceQuery } from './get-sla-compliance.query';

export interface SlaComplianceView {
  readonly compliantCount: number;
  readonly breachedCount: number;
  readonly complianceRate: number;
}

@QueryHandler(GetSlaComplianceQuery)
export class GetSlaComplianceHandler
  extends BaseQueryHandler<GetSlaComplianceQuery, SlaComplianceView>
  implements IQueryHandler<GetSlaComplianceQuery>
{
  readonly queryType = 'logistics.analytics.sla-compliance';

  async execute(_query: GetSlaComplianceQuery): Promise<SlaComplianceView> {
    return { compliantCount: 0, breachedCount: 0, complianceRate: 0 };
  }
}
