import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListChatbotsQuery } from './list-chatbots.query';
import type { ChatbotRepository } from '../../../domain/repositories/chatbot.repository.interface';
import type { ChatbotResponseDTO } from '../../dtos/responses/chatbot-response.dto';

@QueryHandler(ListChatbotsQuery)
export class ListChatbotsHandler
  extends BaseQueryHandler<ListChatbotsQuery, readonly ChatbotResponseDTO[]>
  implements IQueryHandler<ListChatbotsQuery>
{
  readonly queryType = 'support.chatbot.list';

  constructor(private readonly chatbotRepo: ChatbotRepository) {
    super();
  }

  async execute(_query: ListChatbotsQuery): Promise<readonly ChatbotResponseDTO[]> {
    const items = await this.chatbotRepo.findActive();
    return items.map((c) => ({
      id: c.id.value,
      name: c.name,
      status: c.status.value,
      type: c.type.value,
    }));
  }
}
