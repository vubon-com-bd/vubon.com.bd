/**
 * UpdateAutomationCommand
 * @module support-service/application/commands/automation
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { UpdateAutomationRequestDTO } from '../../dtos/requests/automation/update-automation.dto';

export class UpdateAutomationCommand extends BaseCommand {
  readonly type = 'support.automation.update';

  constructor(public readonly payload: UpdateAutomationRequestDTO) {
    super();
  }
}
