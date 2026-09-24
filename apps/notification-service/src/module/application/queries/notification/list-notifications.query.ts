import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListNotificationsQuery extends BaseQuery {
  readonly type = 'notification.list';

  constructor(
    public readonly userId: string,
    public readonly limit: number = 50,
    public readonly onlyUnread: boolean = false,
  ) {
    super();
  }
}
