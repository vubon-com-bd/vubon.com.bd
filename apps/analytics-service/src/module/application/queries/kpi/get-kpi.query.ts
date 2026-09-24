import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetKpiQuery extends BaseQuery {
  readonly type = 'analytics.kpi.get';

  constructor(public readonly kpiId: string) {
    super();
  }
}
