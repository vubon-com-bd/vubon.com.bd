/**
 * GetDeliveryQuery
 * @module order-service/application/queries/delivery
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetDeliveryQuery extends BaseQuery {
  readonly type = 'order.delivery.get';
  constructor(public readonly deliveryId: string) {
    super();
  }
}
