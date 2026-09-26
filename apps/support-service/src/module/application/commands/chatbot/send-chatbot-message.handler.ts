/**
 * SendChatbotMessageHandler
 * @module support-service/application/commands/chatbot
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SendChatbotMessageCommand } from './send-chatbot-message.command';
import type { ChatbotReplyResponseDTO } from '../../dtos/responses/chatbot-reply-response.dto';
import type { ChatbotServiceInterface } from '../../services/interfaces/chatbot.service.interface';

export class SendChatbotMessageHandler extends BaseCommandHandler<
  SendChatbotMessageCommand,
  ChatbotReplyResponseDTO
> {
  readonly commandType = 'support.chatbot.send_message';

  constructor(private readonly chatbotService: ChatbotServiceInterface) {
    super();
  }

  async execute(command: SendChatbotMessageCommand): Promise<ChatbotReplyResponseDTO> {
    return this.chatbotService.sendMessage(command.payload);
  }
}
