import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListSettlementsQuery extends BaseQuery {
  readonly type = 'vendor.settlement.list';

  constructor(
    public readonly vendorId: string,
    public readonly limit: number = 50,
  ) {
    super();
  }
}
