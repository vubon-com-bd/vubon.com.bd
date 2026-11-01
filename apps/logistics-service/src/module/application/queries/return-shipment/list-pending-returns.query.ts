import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListPendingReturnsQuery extends BaseQuery {
  readonly type = 'logistics.return_shipment.list_pending';
  constructor() { super(); }
}
