import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetNotificationPublicQuery extends BaseQuery {
  readonly type = 'notification.get_public';
  constructor(public readonly notificationId: string) { super(); }
}
