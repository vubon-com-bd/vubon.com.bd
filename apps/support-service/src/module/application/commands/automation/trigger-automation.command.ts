/**
 * TriggerAutomationCommand
 * @module support-service/application/commands/automation
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class TriggerAutomationCommand extends BaseCommand {
  readonly type = 'support.automation.trigger';

  constructor(
    public readonly automationId: string,
    public readonly outcome: 'success' | 'failure' | 'partial',
    public readonly errorMessage?: string,
  ) {
    super();
  }
}
