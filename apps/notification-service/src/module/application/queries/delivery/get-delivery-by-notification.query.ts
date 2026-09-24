import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetDeliveryByNotificationQuery extends BaseQuery {
  readonly type = 'delivery.get-by-notification';

  constructor(public readonly notificationId: string) {
    super();
  }
}
