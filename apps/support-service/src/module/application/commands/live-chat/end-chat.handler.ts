/**
 * EndChatHandler
 * @module support-service/application/commands/live-chat
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { EndChatCommand } from './end-chat.command';
import type { LiveChatResponseDTO } from '../../dtos/responses/live-chat-response.dto';
import type { LiveChatServiceInterface } from '../../services/interfaces/live-chat.service.interface';

export class EndChatHandler extends BaseCommandHandler<
  EndChatCommand,
  LiveChatResponseDTO
> {
  readonly commandType = 'support.livechat.end';

  constructor(private readonly chatService: LiveChatServiceInterface) {
    super();
  }

  async execute(command: EndChatCommand): Promise<LiveChatResponseDTO> {
    return this.chatService.end(command.payload);
  }
}
