/**
 * ListTrackingEventsQuery
 * @module order-service/application/queries/tracking
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class ListTrackingEventsQuery extends BaseQuery {
  readonly type = 'order.tracking.list';
  constructor(public readonly orderId: string) {
    super();
  }
}
