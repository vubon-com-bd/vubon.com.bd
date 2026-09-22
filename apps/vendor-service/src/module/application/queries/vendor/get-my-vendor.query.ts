import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetMyVendorQuery extends BaseQuery {
  readonly type = 'vendor.get-my';

  constructor(public readonly ownerId: string) {
    super();
  }
}
