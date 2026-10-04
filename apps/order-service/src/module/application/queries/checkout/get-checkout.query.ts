import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetCheckoutQuery extends BaseQuery {
  readonly type = 'checkout.get';
  constructor(public readonly checkoutId: string) { super(); }
}
