import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { TrainIntentCommand } from './train-intent.command';
import type { ChatbotIntentServiceInterface } from '../../services/interfaces/chatbot-intent.service.interface';

@CommandHandler(TrainIntentCommand)
export class TrainIntentHandler
  extends BaseCommandHandler<TrainIntentCommand, { id: string }>
  implements ICommandHandler<TrainIntentCommand>
{
  readonly commandType = 'support.chatbot.intent.train';

  constructor(private readonly intentService: ChatbotIntentServiceInterface) {
    super();
  }

  async execute(command: TrainIntentCommand): Promise<{ id: string }> {
    return this.intentService.train({
      chatbotId: command.chatbotId,
      name: command.name,
      patterns: [...command.patterns],
      response: command.response,
    });
  }
}
