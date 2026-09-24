import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { EndChatCommand } from './end-chat.command';
import type { LiveChatServiceInterface } from '../../services/interfaces/live-chat.service.interface';
import { LiveChatIdVO } from '../../../domain/value-objects/primitives/live-chat-id.vo';

@CommandHandler(EndChatCommand)
export class EndChatHandler
  extends BaseCommandHandler<EndChatCommand, void>
  implements ICommandHandler<EndChatCommand>
{
  readonly commandType = 'support.chat.end';

  constructor(private readonly liveChatService: LiveChatServiceInterface) {
    super();
  }

  async execute(command: EndChatCommand): Promise<void> {
    void command.reason;
    await this.liveChatService.end(LiveChatIdVO.create(command.chatId));
  }
}
