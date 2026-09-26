import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetNotificationQuery extends BaseQuery {
  readonly type = 'notification.get';

  constructor(public readonly notificationId: string) {
    super();
  }
}
