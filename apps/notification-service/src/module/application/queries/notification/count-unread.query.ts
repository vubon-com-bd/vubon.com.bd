import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class CountUnreadQuery extends BaseQuery {
  readonly type = 'notification.notification.count_unread';
  constructor(public readonly userId: string) { super(); }
}
