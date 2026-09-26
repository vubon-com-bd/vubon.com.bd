/**
 * ListConversationsQuery
 * @module support-service/application/queries/conversation
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListConversationsQuery extends BaseQuery {
  readonly type = 'support.conversation.list';

  constructor(
    public readonly userId: string,
    public readonly page = 1,
    public readonly limit = 20,
  ) {
    super();
  }
}
