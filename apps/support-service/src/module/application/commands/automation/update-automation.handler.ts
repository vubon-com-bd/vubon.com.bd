/**
 * UpdateAutomationHandler
 * @module support-service/application/commands/automation
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdateAutomationCommand } from './update-automation.command';
import type { AutomationResponseDTO } from '../../dtos/responses/automation-response.dto';
import type { AutomationServiceInterface } from '../../services/interfaces/automation.service.interface';

export class UpdateAutomationHandler extends BaseCommandHandler<
  UpdateAutomationCommand,
  AutomationResponseDTO
> {
  readonly commandType = 'support.automation.update';

  constructor(private readonly automationService: AutomationServiceInterface) {
    super();
  }

  async execute(command: UpdateAutomationCommand): Promise<AutomationResponseDTO> {
    return this.automationService.update(command.payload);
  }
}
