import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class TriggerAutomationCommand extends BaseCommand {
  readonly type = 'marketing.automation.trigger';
  constructor(
    public readonly automationId: string,
    public readonly userId: string,
  ) { super(); }
}
