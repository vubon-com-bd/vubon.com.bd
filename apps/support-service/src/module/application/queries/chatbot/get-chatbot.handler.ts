/**
 * GetChatbotHandler
 * @module support-service/application/queries/chatbot
 */
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetChatbotQuery } from './get-chatbot.query';
import type { ChatbotResponseDTO } from '../../dtos/responses/chatbot-response.dto';
import type { ChatbotServiceInterface } from '../../services/interfaces/chatbot.service.interface';

export class GetChatbotHandler extends BaseQueryHandler<
  GetChatbotQuery,
  ChatbotResponseDTO
> {
  readonly queryType = 'support.chatbot.get';

  constructor(private readonly chatbotService: ChatbotServiceInterface) {
    super();
  }

  async execute(query: GetChatbotQuery): Promise<ChatbotResponseDTO> {
    return this.chatbotService.getById(query.chatbotId);
  }
}
