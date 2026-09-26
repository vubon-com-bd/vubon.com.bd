import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetCheckoutQuery extends BaseQuery {
  readonly type = 'checkout.get';

  constructor(public readonly checkoutId: string) {
    super();
  }
}
