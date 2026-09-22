import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListPayoutsQuery extends BaseQuery {
  readonly type = 'vendor.payout.list';

  constructor(
    public readonly vendorId: string,
    public readonly limit: number = 50,
  ) {
    super();
  }
}
