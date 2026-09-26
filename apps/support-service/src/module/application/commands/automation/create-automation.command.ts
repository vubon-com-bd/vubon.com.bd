/**
 * CreateAutomationCommand
 * @module support-service/application/commands/automation
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';
import type { CreateAutomationRequestDTO } from '../../dtos/requests/automation/create-automation.dto';

export class CreateAutomationCommand extends BaseCommand {
  readonly type = 'support.automation.create';

  constructor(public readonly payload: CreateAutomationRequestDTO) {
    super();
  }
}
