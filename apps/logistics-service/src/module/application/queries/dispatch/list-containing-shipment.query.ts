import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListContainingShipmentDispatchQuery extends BaseQuery {
  readonly type = 'logistics.dispatch.list_containing_shipment';
  constructor(public readonly shipmentId: string) { super(); }
}
