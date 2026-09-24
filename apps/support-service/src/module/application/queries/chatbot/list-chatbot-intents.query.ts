import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListChatbotIntentsQuery extends BaseQuery {
  readonly type = 'support.chatbot.intents.list';

  constructor(public readonly chatbotId: string) {
    super();
  }
}
