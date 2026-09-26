/**
 * ListChatsQuery
 * @module support-service/application/queries/live-chat
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListChatsQuery extends BaseQuery {
  readonly type = 'support.livechat.list';

  constructor(
    public readonly page = 1,
    public readonly limit = 20,
  ) {
    super();
  }
}
