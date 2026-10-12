import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetKpiResultsQuery extends BaseQuery {
  readonly type = 'analytics.kpi.results';
  constructor(public readonly kpiId: string) { super(); }
}
