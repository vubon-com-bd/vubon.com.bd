import { BaseCommand } from '@vubon/shared-kernel/application/commands';
import type { DeletePricingRuleRequestDTO } from '../../dtos/requests/pricing/index.js';

export class DeletePricingRuleCommand extends BaseCommand {
  readonly type = 'product.pricing_rule.delete';
  constructor(public readonly dto: DeletePricingRuleRequestDTO) {
    super();
  }
}
