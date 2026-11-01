import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { ShipmentListOptionsDTO } from '@application/services/interfaces/shipment.service.interface';
export class ListShipmentsByVendorQuery extends BaseQuery {
  readonly type = 'logistics.shipment.list_by_vendor';
  constructor(
    public readonly vendorId: string,
    public readonly options: ShipmentListOptionsDTO,
  ) { super(); }
}
