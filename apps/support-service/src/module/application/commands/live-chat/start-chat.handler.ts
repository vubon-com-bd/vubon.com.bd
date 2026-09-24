import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { StartChatCommand } from './start-chat.command';
import type { LiveChatServiceInterface } from '../../services/interfaces/live-chat.service.interface';
import type { LiveChatResponseDTO } from '../../dtos/responses/live-chat-response.dto';

@CommandHandler(StartChatCommand)
export class StartChatHandler
  extends BaseCommandHandler<StartChatCommand, LiveChatResponseDTO>
  implements ICommandHandler<StartChatCommand>
{
  readonly commandType = 'support.chat.start';

  constructor(
    private readonly liveChatService: LiveChatServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: StartChatCommand): Promise<LiveChatResponseDTO> {
    void command.initialMessage;
    void this.eventBus;
    return this.liveChatService.start({
      userId: command.userId,
      type: command.type_,
    });
  }
}
