import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetReturnShipmentQuery extends BaseQuery {
  readonly type = 'logistics.return_shipment.get';
  constructor(public readonly returnId: string) { super(); }
}
