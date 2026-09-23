import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateAutomationCommand } from './create-automation.command';
import type { MarketingAutomationServiceInterface } from '../../services/interfaces/marketing-automation.service.interface';
import type { AutomationResponseDTO } from '../../dtos/responses/automation-response.dto';

@CommandHandler(CreateAutomationCommand)
export class CreateAutomationHandler
  extends BaseCommandHandler<CreateAutomationCommand, AutomationResponseDTO>
  implements ICommandHandler<CreateAutomationCommand> {
  readonly commandType = 'marketing.automation.create';
  constructor(private readonly automationService: MarketingAutomationServiceInterface) { super(); }
  async execute(command: CreateAutomationCommand): Promise<AutomationResponseDTO> {
    return this.automationService.create({
      name: command.name,
      type: command.automationType,
      trigger: command.trigger,
    } as never);
  }
}
