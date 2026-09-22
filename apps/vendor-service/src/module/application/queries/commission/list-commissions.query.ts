import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListCommissionsQuery extends BaseQuery {
  readonly type = 'vendor.commission.list';

  constructor(
    public readonly vendorId: string,
    public readonly limit: number = 50,
  ) {
    super();
  }
}
