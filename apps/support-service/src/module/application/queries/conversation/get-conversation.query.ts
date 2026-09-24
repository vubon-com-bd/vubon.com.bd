import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetConversationQuery extends BaseQuery {
  readonly type = 'support.conversation.get';

  constructor(public readonly conversationId: string) {
    super();
  }
}
