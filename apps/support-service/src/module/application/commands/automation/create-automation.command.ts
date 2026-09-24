import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateAutomationCommand extends BaseCommand {
  readonly type = 'support.automation.create';

  constructor(
    public readonly name: string,
    public readonly type_: string,
    public readonly trigger: string,
    public readonly action: string,
    public readonly config?: Readonly<Record<string, unknown>>,
  ) {
    super();
  }
}
