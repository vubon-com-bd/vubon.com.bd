import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetReturnShipmentByRmaQuery extends BaseQuery {
  readonly type = 'logistics.return_shipment.by_rma';
  constructor(public readonly rmaNumber: string) { super(); }
}
