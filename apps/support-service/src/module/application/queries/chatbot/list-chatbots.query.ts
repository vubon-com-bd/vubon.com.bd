import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListChatbotsQuery extends BaseQuery {
  readonly type = 'support.chatbot.list';

  constructor() {
    super();
  }
}
