import { BaseCommand } from '@vubon/shared-kernel/application/commands/base.command';

export class CreatePricingRuleCommand extends BaseCommand {
  readonly type = 'product.pricing_rule.create';

  constructor(
    public readonly productId: string,
    public readonly ruleType: string,
    public readonly value: string,
    public readonly startAt?: string,
    public readonly endAt?: string,
  ) {
    super();
  }
}
