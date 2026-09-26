import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListOrdersByVendorQuery extends BaseQuery {
  readonly type = 'order.list-by-vendor';

  constructor(public readonly vendorId: string) {
    super();
  }
}
