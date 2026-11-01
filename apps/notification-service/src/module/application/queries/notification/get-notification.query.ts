import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetNotificationQuery extends BaseQuery {
  readonly type = 'notification.notification.get';
  constructor(public readonly notificationId: string) { super(); }
}
