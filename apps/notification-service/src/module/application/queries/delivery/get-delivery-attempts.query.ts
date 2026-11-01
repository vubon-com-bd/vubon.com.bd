import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetDeliveryAttemptsQuery extends BaseQuery {
  readonly type = 'notification.delivery.attempts';
  constructor(public readonly notificationId: string) { super(); }
}
