import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeletePricingRuleCommand } from './delete-pricing-rule.command.js';
import {
  PRICING_RULE_SERVICE,
  type IProductPricingRuleService,
} from '../../services/interfaces/product-pricing-rule.service.interface.js';

@CommandHandler(DeletePricingRuleCommand)
export class DeletePricingRuleHandler
  implements ICommandHandler<
    DeletePricingRuleCommand,
    { readonly success: true; readonly ruleId: string }
  >
{
  constructor(
    @Inject(PRICING_RULE_SERVICE)
    private readonly service: IProductPricingRuleService,
  ) {}

  async execute(c: DeletePricingRuleCommand) {
    return this.service.delete(c.dto);
  }
}
