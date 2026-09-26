/**
 * DisableAutomationHandler
 * @module support-service/application/commands/automation
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DisableAutomationCommand } from './disable-automation.command';
import type { AutomationResponseDTO } from '../../dtos/responses/automation-response.dto';
import type { AutomationServiceInterface } from '../../services/interfaces/automation.service.interface';

export class DisableAutomationHandler extends BaseCommandHandler<
  DisableAutomationCommand,
  AutomationResponseDTO
> {
  readonly commandType = 'support.automation.disable';

  constructor(private readonly automationService: AutomationServiceInterface) {
    super();
  }

  async execute(command: DisableAutomationCommand): Promise<AutomationResponseDTO> {
    return this.automationService.disable(command.automationId);
  }
}
