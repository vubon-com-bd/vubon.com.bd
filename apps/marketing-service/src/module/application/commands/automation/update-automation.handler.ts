import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateAutomationCommand } from './update-automation.command';

@CommandHandler(UpdateAutomationCommand)
export class UpdateAutomationHandler
  extends BaseCommandHandler<UpdateAutomationCommand, void>
  implements ICommandHandler<UpdateAutomationCommand> {
  readonly commandType = 'marketing.automation.update';
  async execute(command: UpdateAutomationCommand): Promise<void> {
    void command;
  }
}
