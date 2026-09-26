/**
 * TriggerAutomationHandler
 * @module support-service/application/commands/automation
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { TriggerAutomationCommand } from './trigger-automation.command';
import type { AutomationResponseDTO } from '../../dtos/responses/automation-response.dto';
import type { AutomationServiceInterface } from '../../services/interfaces/automation.service.interface';

export class TriggerAutomationHandler extends BaseCommandHandler<
  TriggerAutomationCommand,
  AutomationResponseDTO
> {
  readonly commandType = 'support.automation.trigger';

  constructor(private readonly automationService: AutomationServiceInterface) {
    super();
  }

  async execute(command: TriggerAutomationCommand): Promise<AutomationResponseDTO> {
    return this.automationService.trigger(
      command.automationId,
      command.outcome,
      command.errorMessage,
    );
  }
}
