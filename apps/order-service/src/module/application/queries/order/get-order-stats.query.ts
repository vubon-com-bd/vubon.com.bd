/**
 * GetOrderStatsQuery
 * @module order-service/application/queries/order
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetOrderStatsQuery extends BaseQuery {
  readonly type = 'order.order.get-stats';
  constructor(public readonly customerId?: string) {
    super();
  }
}
