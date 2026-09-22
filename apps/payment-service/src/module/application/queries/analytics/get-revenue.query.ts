import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetRevenueQuery extends BaseQuery {
  readonly type = 'analytics.get-revenue';

  constructor(
    public readonly fromDate: string,
    public readonly toDate: string,
    public readonly currency: string = 'BDT',
  ) {
    super();
  }
}
