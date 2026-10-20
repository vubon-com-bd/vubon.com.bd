/**
 * GetCheckoutSessionQuery
 * @module order-service/application/queries/checkout
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetCheckoutSessionQuery extends BaseQuery {
  readonly type = 'order.checkout-session.get';
  constructor(public readonly sessionId: string) {
    super();
  }
}
