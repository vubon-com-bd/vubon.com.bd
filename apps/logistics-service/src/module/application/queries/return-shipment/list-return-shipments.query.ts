import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { ReturnShipmentListOptionsDTO } from '../../services/interfaces/return-shipment.service.interface.js';
export class ListReturnShipmentsQuery extends BaseQuery {
  readonly type = 'logistics.return_shipment.list';
  constructor(public readonly options: ReturnShipmentListOptionsDTO) { super(); }
}
