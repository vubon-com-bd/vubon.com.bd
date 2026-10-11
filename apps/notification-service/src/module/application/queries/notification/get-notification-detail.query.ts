import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetNotificationDetailQuery extends BaseQuery {
  readonly type = 'notification.get_detail';
  constructor(public readonly notificationId: string) { super(); }
}
