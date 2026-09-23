import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetShippingMethodQuery extends BaseQuery {
  readonly type = 'logistics.shipping-method.get';

  constructor(public readonly methodId: string) {
    super();
  }
}
