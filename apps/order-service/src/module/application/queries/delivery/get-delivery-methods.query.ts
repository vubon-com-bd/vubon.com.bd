/**
 * GetDeliveryMethodsQuery
 * @module order-service/application/queries/delivery
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetDeliveryMethodsQuery extends BaseQuery {
  readonly type = 'order.delivery-method.list';
  constructor(public readonly onlyActive = true) {
    super();
  }
}
