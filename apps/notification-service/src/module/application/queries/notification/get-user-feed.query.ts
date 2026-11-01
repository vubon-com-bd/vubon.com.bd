import { BaseQuery } from '@vubon/shared-kernel/application/queries';

export class GetUserFeedQuery extends BaseQuery {
  readonly type = 'notification.notification.user_feed';
  constructor(
    public readonly userId: string,
    public readonly page: number = 1,
    public readonly limit: number = 20,
  ) { super(); }
}
