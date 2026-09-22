import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetCommissionSummaryQuery extends BaseQuery {
  readonly type = 'vendor.commission.summary';

  constructor(public readonly vendorId: string) {
    super();
  }
}
