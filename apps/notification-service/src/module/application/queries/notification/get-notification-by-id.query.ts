import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetNotificationByIdQuery extends BaseQuery {
  readonly type = 'notification.get_by_id';
  constructor(public readonly notificationId: string) { super(); }
}
