import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetDeliveryByOrderQuery extends BaseQuery {
  readonly type = 'delivery.get-by-order';

  constructor(public readonly orderId: string) {
    super();
  }
}
