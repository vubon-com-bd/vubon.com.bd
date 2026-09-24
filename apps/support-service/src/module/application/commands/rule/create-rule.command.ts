import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreateRuleCommand extends BaseCommand {
  readonly type = 'support.rule.create';

  constructor(
    public readonly name: string,
    public readonly type_: string,
    public readonly condition: string,
    public readonly action: string,
    public readonly priority: number = 50,
  ) {
    super();
  }
}
