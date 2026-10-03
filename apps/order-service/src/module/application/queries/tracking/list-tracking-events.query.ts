import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListTrackingEventsQuery extends BaseQuery {
  readonly type = 'tracking.list';
  constructor(public readonly orderId: string) { super(); }
}
