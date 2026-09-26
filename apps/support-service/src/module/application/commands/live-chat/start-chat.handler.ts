/**
 * StartChatHandler
 * @module support-service/application/commands/live-chat
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { StartChatCommand } from './start-chat.command';
import type { LiveChatResponseDTO } from '../../dtos/responses/live-chat-response.dto';
import type { LiveChatServiceInterface } from '../../services/interfaces/live-chat.service.interface';

export class StartChatHandler extends BaseCommandHandler<
  StartChatCommand,
  LiveChatResponseDTO
> {
  readonly commandType = 'support.livechat.start';

  constructor(private readonly chatService: LiveChatServiceInterface) {
    super();
  }

  async execute(command: StartChatCommand): Promise<LiveChatResponseDTO> {
    return this.chatService.start(command.payload);
  }
}
