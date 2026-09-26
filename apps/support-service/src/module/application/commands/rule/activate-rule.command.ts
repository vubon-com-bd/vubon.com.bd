/**
 * ActivateRuleCommand
 * @module support-service/application/commands/rule
 */
import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class ActivateRuleCommand extends BaseCommand {
  readonly type = 'support.rule.activate';

  constructor(public readonly ruleId: string) {
    super();
  }
}
