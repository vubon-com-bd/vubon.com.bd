import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class DeletePricingRuleCommand extends BaseCommand {
  readonly type = 'product.pricing_rule.delete';

  constructor(public readonly ruleId: string) {
    super();
  }
}
