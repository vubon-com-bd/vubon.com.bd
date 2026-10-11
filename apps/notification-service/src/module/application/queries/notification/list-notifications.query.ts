import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { NotificationListOptionsDTO } from '../../dtos/requests/notification/list-notifications.dto.js';

export class ListNotificationsQuery extends BaseQuery {
  readonly type = 'notification.list';
  constructor(
    public readonly userId: string,
    public readonly options: NotificationListOptionsDTO,
  ) {
    super();
  }
}
