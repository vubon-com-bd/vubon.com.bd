import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetDeliveryAttemptsQuery extends BaseQuery {
  readonly type = 'logistics.delivery.get-attempts';

  constructor(public readonly deliveryId: string) {
    super();
  }
}
