import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListShippingMethodsQuery extends BaseQuery {
  readonly type = 'logistics.shipping-method.list';

  constructor(public readonly activeOnly: boolean = false) {
    super();
  }
}
