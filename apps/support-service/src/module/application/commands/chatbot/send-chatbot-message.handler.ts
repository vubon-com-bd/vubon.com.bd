import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SendChatbotMessageCommand } from './send-chatbot-message.command';
import type { ChatbotServiceInterface } from '../../services/interfaces/chatbot.service.interface';
import type { ChatbotMessageResponseDTO } from '../../dtos/responses/chatbot-response.dto';

@CommandHandler(SendChatbotMessageCommand)
export class SendChatbotMessageHandler
  extends BaseCommandHandler<SendChatbotMessageCommand, ChatbotMessageResponseDTO>
  implements ICommandHandler<SendChatbotMessageCommand>
{
  readonly commandType = 'support.chatbot.message.send';

  constructor(private readonly chatbotService: ChatbotServiceInterface) {
    super();
  }

  async execute(command: SendChatbotMessageCommand): Promise<ChatbotMessageResponseDTO> {
    return this.chatbotService.sendMessage({
      chatbotId: command.chatbotId,
      userId: command.userId,
      message: command.message,
    });
  }
}
