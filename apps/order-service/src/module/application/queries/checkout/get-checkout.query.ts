/**
 * GetCheckoutQuery
 * @module order-service/application/queries/checkout
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetCheckoutQuery extends BaseQuery {
  readonly type = 'order.checkout.get';
  constructor(public readonly checkoutId: string) {
    super();
  }
}
