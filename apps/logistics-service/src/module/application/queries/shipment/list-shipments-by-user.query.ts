import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { ShipmentListOptionsDTO } from '@application/services/interfaces/shipment.service.interface';
export class ListShipmentsByUserQuery extends BaseQuery {
  readonly type = 'logistics.shipment.list_by_user';
  constructor(
    public readonly userId: string,
    public readonly options: ShipmentListOptionsDTO,
  ) { super(); }
}
