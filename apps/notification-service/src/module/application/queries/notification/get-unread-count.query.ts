import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetUnreadCountQuery extends BaseQuery {
  readonly type = 'notification.get_unread_count';
  constructor(public readonly userId: string) { super(); }
}
