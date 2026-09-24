import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { SendChatMessageCommand } from './send-chat-message.command';
import type { LiveChatRepository } from '../../../domain/repositories/live-chat.repository.interface';
import { LiveChatIdVO } from '../../../domain/value-objects/primitives/live-chat-id.vo';
import { ChatNotFoundError } from '../../errors/chat.errors';

@CommandHandler(SendChatMessageCommand)
export class SendChatMessageHandler
  extends BaseCommandHandler<SendChatMessageCommand, void>
  implements ICommandHandler<SendChatMessageCommand>
{
  readonly commandType = 'support.chat.message.send';

  constructor(
    private readonly liveChatRepo: LiveChatRepository,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: SendChatMessageCommand): Promise<void> {
    void command.content;
    void command.type_;
    const chat = await this.liveChatRepo.findById(LiveChatIdVO.create(command.chatId));
    if (!chat) throw new ChatNotFoundError(command.chatId);
    void this.eventBus;
  }
}
