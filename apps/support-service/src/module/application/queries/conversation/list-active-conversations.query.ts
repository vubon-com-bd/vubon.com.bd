import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListActiveConversationsQuery extends BaseQuery {
  readonly type = 'support.conversation.list-active';

  constructor() {
    super();
  }
}
