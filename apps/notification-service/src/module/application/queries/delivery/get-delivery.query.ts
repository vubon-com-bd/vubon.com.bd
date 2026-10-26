import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetDeliveryQuery extends BaseQuery {
  readonly type = 'notification.delivery.get';
  constructor(public readonly notificationId: string) { super(); }
}
