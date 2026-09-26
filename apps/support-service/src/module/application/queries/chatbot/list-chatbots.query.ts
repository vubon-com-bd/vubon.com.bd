/**
 * ListChatbotsQuery
 * @module support-service/application/queries/chatbot
 */
import { BaseQuery } from '@vubon/shared-kernel/application/queries/base.query';

export class ListChatbotsQuery extends BaseQuery {
  readonly type = 'support.chatbot.list';

  constructor(
    public readonly page = 1,
    public readonly limit = 20,
  ) {
    super();
  }
}
