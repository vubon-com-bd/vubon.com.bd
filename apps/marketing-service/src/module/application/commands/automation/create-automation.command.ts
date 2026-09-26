import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateAutomationCommand extends BaseCommand {
  readonly type = 'marketing.automation.create';
  constructor(
    public readonly name: string,
    public readonly automationType: string,
    public readonly trigger: string,
  ) { super(); }
}
