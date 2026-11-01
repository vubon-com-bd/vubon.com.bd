import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetCommissionSummaryQuery extends BaseQuery {
  readonly type = 'vendor.commission.summary';
  constructor(public readonly vendorId?: string) {
    super();
  }
}
