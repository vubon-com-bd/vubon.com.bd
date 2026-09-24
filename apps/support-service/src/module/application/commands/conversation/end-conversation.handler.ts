import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { EndConversationCommand } from './end-conversation.command';
import type { ConversationServiceInterface } from '../../services/interfaces/conversation.service.interface';
import { ConversationIdVO } from '../../../domain/value-objects/primitives/conversation-id.vo';

@CommandHandler(EndConversationCommand)
export class EndConversationHandler
  extends BaseCommandHandler<EndConversationCommand, void>
  implements ICommandHandler<EndConversationCommand>
{
  readonly commandType = 'support.conversation.end';

  constructor(private readonly conversationService: ConversationServiceInterface) {
    super();
  }

  async execute(command: EndConversationCommand): Promise<void> {
    void command.reason;
    await this.conversationService.end(ConversationIdVO.create(command.conversationId));
  }
}
