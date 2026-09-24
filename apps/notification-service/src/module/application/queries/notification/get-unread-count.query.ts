import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetUnreadCountQuery extends BaseQuery {
  readonly type = 'notification.unread-count';

  constructor(public readonly userId: string) {
    super();
  }
}
