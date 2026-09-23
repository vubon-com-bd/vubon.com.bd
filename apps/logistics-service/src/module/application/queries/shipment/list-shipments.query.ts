import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export interface ListShipmentsFilter {
  readonly status?: string;
  readonly vendorId?: string;
  readonly orderId?: string;
  readonly search?: string;
}

export class ListShipmentsQuery extends BaseQuery {
  readonly type = 'logistics.shipment.list';

  constructor(
    public readonly page: number = 1,
    public readonly limit: number = 20,
    public readonly filter?: ListShipmentsFilter,
  ) {
    super();
  }
}
