/**
 * SendChatMessageHandler
 * @module support-service/application/commands/live-chat
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SendChatMessageCommand } from './send-chat-message.command';
import type { LiveChatResponseDTO } from '../../dtos/responses/live-chat-response.dto';
import type { LiveChatServiceInterface } from '../../services/interfaces/live-chat.service.interface';

export class SendChatMessageHandler extends BaseCommandHandler<
  SendChatMessageCommand,
  LiveChatResponseDTO
> {
  readonly commandType = 'support.livechat.send_message';

  constructor(private readonly chatService: LiveChatServiceInterface) {
    super();
  }

  async execute(command: SendChatMessageCommand): Promise<LiveChatResponseDTO> {
    return this.chatService.sendMessage(command.payload);
  }
}
