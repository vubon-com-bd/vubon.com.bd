import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { ShipmentListOptionsDTO } from '@application/services/interfaces/shipment.service.interface';
export class SearchShipmentsQuery extends BaseQuery {
  readonly type = 'logistics.shipment.search';
  constructor(
    public readonly query: string,
    public readonly options: ShipmentListOptionsDTO,
  ) { super(); }
}
