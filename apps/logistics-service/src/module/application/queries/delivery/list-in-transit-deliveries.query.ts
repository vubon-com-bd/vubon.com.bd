import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListInTransitDeliveriesQuery extends BaseQuery {
  readonly type = 'logistics.delivery.list_in_transit';
  constructor() { super(); }
}
