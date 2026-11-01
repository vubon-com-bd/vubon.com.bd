import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListByVendorFulfillmentQuery extends BaseQuery {
  readonly type = 'logistics.fulfillment.listByVendor';
  constructor(public readonly vendorId: string) { super(); }
}
