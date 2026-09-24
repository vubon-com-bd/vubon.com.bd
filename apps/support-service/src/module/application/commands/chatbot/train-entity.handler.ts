import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { TrainEntityCommand } from './train-entity.command';
import type { ChatbotEntityServiceInterface } from '../../services/interfaces/chatbot-entity.service.interface';

@CommandHandler(TrainEntityCommand)
export class TrainEntityHandler
  extends BaseCommandHandler<TrainEntityCommand, { id: string }>
  implements ICommandHandler<TrainEntityCommand>
{
  readonly commandType = 'support.chatbot.entity.train';

  constructor(private readonly entityService: ChatbotEntityServiceInterface) {
    super();
  }

  async execute(command: TrainEntityCommand): Promise<{ id: string }> {
    return this.entityService.train({
      chatbotId: command.chatbotId,
      name: command.name,
      type: command.type_,
      value: command.value,
    });
  }
}
