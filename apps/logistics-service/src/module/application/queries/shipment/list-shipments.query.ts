import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { ShipmentListOptionsDTO } from '../../services/interfaces/shipment.service.interface.js';

export class ListShipmentsQuery extends BaseQuery {
  readonly type = 'logistics.shipment.list';
  constructor(public readonly options: ShipmentListOptionsDTO) { super(); }
}
