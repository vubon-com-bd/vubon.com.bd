import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetShippingQuery extends BaseQuery {
  readonly type = 'vendor.shipping.get';
  constructor(public readonly vendorId: string) {
    super();
  }
}
