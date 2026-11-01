import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListReturnShipmentsByUserQuery extends BaseQuery {
  readonly type = 'logistics.return_shipment.list_by_user';
  constructor(public readonly userId: string) { super(); }
}
