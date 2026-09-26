import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetActiveCheckoutQuery extends BaseQuery {
  readonly type = 'checkout.get-active';

  constructor(public readonly customerId: string) {
    super();
  }
}
