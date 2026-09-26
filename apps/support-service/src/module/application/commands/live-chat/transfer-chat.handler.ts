/**
 * TransferChatHandler
 * @module support-service/application/commands/live-chat
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { TransferChatCommand } from './transfer-chat.command';
import type { LiveChatResponseDTO } from '../../dtos/responses/live-chat-response.dto';
import type { LiveChatServiceInterface } from '../../services/interfaces/live-chat.service.interface';

export class TransferChatHandler extends BaseCommandHandler<
  TransferChatCommand,
  LiveChatResponseDTO
> {
  readonly commandType = 'support.livechat.transfer';

  constructor(private readonly chatService: LiveChatServiceInterface) {
    super();
  }

  async execute(command: TransferChatCommand): Promise<LiveChatResponseDTO> {
    return this.chatService.transfer(command.payload);
  }
}
