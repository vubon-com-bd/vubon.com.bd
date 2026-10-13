import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { UpdatePricingRuleRequestDTO } from '../../dtos/requests/pricing/index.js';

export class UpdatePricingRuleCommand extends BaseCommand {
  readonly type = 'product.pricing_rule.update';
  constructor(public readonly dto: UpdatePricingRuleRequestDTO) {
    super();
  }
}
