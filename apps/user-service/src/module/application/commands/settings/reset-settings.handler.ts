import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { ResetSettingsCommand } from './reset-settings.command';

@CommandHandler(ResetSettingsCommand)
export class ResetSettingsHandler
  extends BaseCommandHandler<ResetSettingsCommand, void>
  implements ICommandHandler<ResetSettingsCommand>
{
  readonly commandType = 'user.settings.reset';

  constructor(private readonly eventBus: EventBus) {
    super();
  }

  async execute(command: ResetSettingsCommand): Promise<void> {
    void command;
    throw new Error('reset-settings not yet wired');
  }
}
