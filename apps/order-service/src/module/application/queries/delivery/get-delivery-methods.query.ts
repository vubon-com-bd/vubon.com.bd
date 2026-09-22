import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetDeliveryMethodsQuery extends BaseQuery {
  readonly type = 'delivery.methods.list';

  constructor() {
    super();
  }
}
