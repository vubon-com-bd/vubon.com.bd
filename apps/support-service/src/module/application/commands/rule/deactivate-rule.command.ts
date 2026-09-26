/**
 * DeactivateRuleCommand
 * @module support-service/application/commands/rule
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class DeactivateRuleCommand extends BaseCommand {
  readonly type = 'support.rule.deactivate';

  constructor(public readonly ruleId: string) {
    super();
  }
}
