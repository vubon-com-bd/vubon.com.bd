import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetPublicNotificationQuery extends BaseQuery {
  readonly type = 'notification.notification.get_public';
  constructor(public readonly notificationId: string) { super(); }
}
