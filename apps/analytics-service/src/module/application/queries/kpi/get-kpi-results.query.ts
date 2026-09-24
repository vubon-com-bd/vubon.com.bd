import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetKpiResultsQuery extends BaseQuery {
  readonly type = 'analytics.kpi.get-results';

  constructor(
    public readonly kpiId: string,
    public readonly limit: number = 20,
  ) {
    super();
  }
}
