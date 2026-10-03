import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetCheckoutSessionQuery extends BaseQuery {
  readonly type = 'checkout.session.get';
  constructor(public readonly checkoutId: string) { super(); }
}
