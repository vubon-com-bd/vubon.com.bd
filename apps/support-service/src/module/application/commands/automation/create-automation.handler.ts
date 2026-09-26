/**
 * CreateAutomationHandler
 * @module support-service/application/commands/automation
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateAutomationCommand } from './create-automation.command';
import type { AutomationResponseDTO } from '../../dtos/responses/automation-response.dto';
import type { AutomationServiceInterface } from '../../services/interfaces/automation.service.interface';

export class CreateAutomationHandler extends BaseCommandHandler<
  CreateAutomationCommand,
  AutomationResponseDTO
> {
  readonly commandType = 'support.automation.create';

  constructor(private readonly automationService: AutomationServiceInterface) {
    super();
  }

  async execute(command: CreateAutomationCommand): Promise<AutomationResponseDTO> {
    return this.automationService.create(command.payload);
  }
}
