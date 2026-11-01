import { BaseQuery } from '@vubon/shared-kernel/application/queries';
export class ListTrackingsByOrderQuery extends BaseQuery {
  readonly type = 'logistics.tracking.list_by_order';
  constructor(public readonly orderId: string) { super(); }
}
