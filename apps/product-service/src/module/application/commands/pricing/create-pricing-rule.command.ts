import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { CreatePricingRuleRequestDTO } from '../../dtos/requests/pricing/index.js';

export class CreatePricingRuleCommand extends BaseCommand {
  readonly type = 'product.pricing_rule.create';
  constructor(public readonly dto: CreatePricingRuleRequestDTO) {
    super();
  }
}
