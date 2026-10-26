import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { NotificationListOptionsDTO } from '@application/services/interfaces/notification.service.interface.js';

export class ListNotificationsQuery extends BaseQuery {
  readonly type = 'notification.notification.list';
  constructor(public readonly options: NotificationListOptionsDTO) { super(); }
}
