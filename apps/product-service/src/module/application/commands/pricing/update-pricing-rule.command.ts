import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class UpdatePricingRuleCommand extends BaseCommand {
  readonly type = 'product.pricing_rule.update';

  constructor(
    public readonly ruleId: string,
    public readonly value: string,
  ) {
    super();
  }
}
