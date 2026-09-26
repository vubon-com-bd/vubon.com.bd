/**
 * EnableAutomationHandler
 * @module support-service/application/commands/automation
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { EnableAutomationCommand } from './enable-automation.command';
import type { AutomationResponseDTO } from '../../dtos/responses/automation-response.dto';
import type { AutomationServiceInterface } from '../../services/interfaces/automation.service.interface';

export class EnableAutomationHandler extends BaseCommandHandler<
  EnableAutomationCommand,
  AutomationResponseDTO
> {
  readonly commandType = 'support.automation.enable';

  constructor(private readonly automationService: AutomationServiceInterface) {
    super();
  }

  async execute(command: EnableAutomationCommand): Promise<AutomationResponseDTO> {
    return this.automationService.enable(command.automationId);
  }
}
