/**
 * GetFulfillmentQuery
 * @module order-service/application/queries/fulfillment
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetFulfillmentQuery extends BaseQuery {
  readonly type = 'order.fulfillment.get';
  constructor(public readonly fulfillmentId: string) {
    super();
  }
}
