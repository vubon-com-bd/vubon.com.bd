import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetDeliveryQuery extends BaseQuery {
  readonly type = 'delivery.get';

  constructor(public readonly deliveryId: string) {
    super();
  }
}
