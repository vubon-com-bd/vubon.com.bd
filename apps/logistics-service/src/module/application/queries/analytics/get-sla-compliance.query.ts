import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetSlaComplianceQuery extends BaseQuery {
  readonly type = 'logistics.analytics.sla-compliance';

  constructor(
    public readonly fromDate?: string,
    public readonly toDate?: string,
  ) {
    super();
  }
}
