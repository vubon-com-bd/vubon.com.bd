import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { TransferChatCommand } from './transfer-chat.command';
import type { LiveChatRepository } from '../../../domain/repositories/live-chat.repository.interface';
import { LiveChatIdVO } from '../../../domain/value-objects/primitives/live-chat-id.vo';
import { ChatNotFoundError } from '../../errors/chat.errors';

@CommandHandler(TransferChatCommand)
export class TransferChatHandler
  extends BaseCommandHandler<TransferChatCommand, void>
  implements ICommandHandler<TransferChatCommand>
{
  readonly commandType = 'support.chat.transfer';

  constructor(private readonly liveChatRepo: LiveChatRepository) {
    super();
  }

  async execute(command: TransferChatCommand): Promise<void> {
    void command.agentId;
    void command.reason;
    const chat = await this.liveChatRepo.findById(LiveChatIdVO.create(command.chatId));
    if (!chat) throw new ChatNotFoundError(command.chatId);
  }
}
