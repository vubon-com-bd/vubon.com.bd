/**
 * DisableAutomationCommand
 * @module support-service/application/commands/automation
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class DisableAutomationCommand extends BaseCommand {
  readonly type = 'support.automation.disable';

  constructor(public readonly automationId: string) {
    super();
  }
}
