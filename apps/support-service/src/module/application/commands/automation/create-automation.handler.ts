import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateAutomationCommand } from './create-automation.command';
import type { AutomationServiceInterface } from '../../services/interfaces/automation.service.interface';

@CommandHandler(CreateAutomationCommand)
export class CreateAutomationHandler
  extends BaseCommandHandler<CreateAutomationCommand, { id: string }>
  implements ICommandHandler<CreateAutomationCommand>
{
  readonly commandType = 'support.automation.create';

  constructor(private readonly automationService: AutomationServiceInterface) {
    super();
  }

  async execute(command: CreateAutomationCommand): Promise<{ id: string }> {
    return this.automationService.create({
      name: command.name,
      type: command.type_,
      trigger: command.trigger,
      action: command.action,
      config: command.config,
    });
  }
}
