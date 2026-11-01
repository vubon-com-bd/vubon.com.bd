import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { ShipmentListOptionsDTO } from '@application/services/interfaces/shipment.service.interface';
export class ListShipmentsQuery extends BaseQuery {
  readonly type = 'logistics.shipment.list';
  constructor(public readonly options: ShipmentListOptionsDTO) { super(); }
}
