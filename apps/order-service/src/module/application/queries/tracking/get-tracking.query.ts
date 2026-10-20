/**
 * GetTrackingQuery
 * @module order-service/application/queries/tracking
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetTrackingQuery extends BaseQuery {
  readonly type = 'order.tracking.get';
  constructor(public readonly trackingId: string) {
    super();
  }
}
