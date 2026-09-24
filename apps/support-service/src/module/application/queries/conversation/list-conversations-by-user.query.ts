import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListConversationsByUserQuery extends BaseQuery {
  readonly type = 'support.conversation.list-by-user';

  constructor(public readonly userId: string) {
    super();
  }
}
