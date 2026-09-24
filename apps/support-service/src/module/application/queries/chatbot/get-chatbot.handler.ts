import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetChatbotQuery } from './get-chatbot.query';
import type { ChatbotRepository } from '../../../domain/repositories/chatbot.repository.interface';
import { ChatbotIdVO } from '../../../domain/value-objects/primitives/chatbot-id.vo';
import { ChatbotNotFoundError } from '../../errors/chatbot.errors';
import type { ChatbotResponseDTO } from '../../dtos/responses/chatbot-response.dto';

@QueryHandler(GetChatbotQuery)
export class GetChatbotHandler
  extends BaseQueryHandler<GetChatbotQuery, ChatbotResponseDTO>
  implements IQueryHandler<GetChatbotQuery>
{
  readonly queryType = 'support.chatbot.get';

  constructor(private readonly chatbotRepo: ChatbotRepository) {
    super();
  }

  async execute(query: GetChatbotQuery): Promise<ChatbotResponseDTO> {
    const c = await this.chatbotRepo.findById(ChatbotIdVO.create(query.chatbotId));
    if (!c) throw new ChatbotNotFoundError(query.chatbotId);
    return {
      id: c.id.value,
      name: c.name,
      status: c.status.value,
      type: c.type.value,
    };
  }
}
