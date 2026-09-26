/**
 * GetChatbotQuery
 * @module support-service/application/queries/chatbot
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class GetChatbotQuery extends BaseQuery {
  readonly type = 'support.chatbot.get';

  constructor(public readonly chatbotId: string) {
    super();
  }
}
