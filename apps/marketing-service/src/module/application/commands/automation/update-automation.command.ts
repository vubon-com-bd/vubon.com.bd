import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateAutomationCommand extends BaseCommand {
  readonly type = 'marketing.automation.update';
  constructor(
    public readonly automationId: string,
    public readonly name?: string,
    public readonly status?: string,
  ) { super(); }
}
