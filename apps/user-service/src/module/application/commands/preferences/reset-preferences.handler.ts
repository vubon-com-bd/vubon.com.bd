import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ResetPreferencesCommand } from './reset-preferences.command';

@CommandHandler(ResetPreferencesCommand)
export class ResetPreferencesHandler
  extends BaseCommandHandler<ResetPreferencesCommand, void>
  implements ICommandHandler<ResetPreferencesCommand>
{
  readonly commandType = 'user.preferences.reset';

  constructor(private readonly eventBus: EventBus) {
    super();
  }

  async execute(command: ResetPreferencesCommand): Promise<void> {
    void command;
    throw new Error('reset-preferences not yet wired');
  }
}
