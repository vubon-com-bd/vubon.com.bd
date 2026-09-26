/**
 * EnableAutomationCommand
 * @module support-service/application/commands/automation
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class EnableAutomationCommand extends BaseCommand {
  readonly type = 'support.automation.enable';

  constructor(public readonly automationId: string) {
    super();
  }
}
