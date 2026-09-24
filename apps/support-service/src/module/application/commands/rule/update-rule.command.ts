import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdateRuleCommand extends BaseCommand {
  readonly type = 'support.rule.update';

  constructor(
    public readonly ruleId: string,
    public readonly name?: string,
    public readonly priority?: number,
    public readonly isActive?: boolean,
  ) {
    super();
  }
}
