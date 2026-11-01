import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetShipmentPublicQuery extends BaseQuery {
  readonly type = 'logistics.shipment.get_public';
  constructor(public readonly shipmentId: string) { super(); }
}
