import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class GetReturnShipmentStatsQuery extends BaseQuery {
  readonly type = 'logistics.return_shipment.stats';
  constructor() { super(); }
}
