import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListChatbotIntentsQuery } from './list-chatbot-intents.query';
import type { ChatbotIntentRepository } from '../../../domain/repositories/chatbot-intent.repository.interface';
import { ChatbotIdVO } from '../../../domain/value-objects/primitives/chatbot-id.vo';

@QueryHandler(ListChatbotIntentsQuery)
export class ListChatbotIntentsHandler
  extends BaseQueryHandler<ListChatbotIntentsQuery, readonly unknown[]>
  implements IQueryHandler<ListChatbotIntentsQuery>
{
  readonly queryType = 'support.chatbot.intents.list';

  constructor(private readonly intentRepo: ChatbotIntentRepository) {
    super();
  }

  async execute(query: ListChatbotIntentsQuery): Promise<readonly unknown[]> {
    const intents = await this.intentRepo.findByChatbot(ChatbotIdVO.create(query.chatbotId));
    return intents.map((i) => ({
      id: i.id.value,
      name: i.name,
      patterns: i.patterns,
      response: i.response,
    }));
  }
}
