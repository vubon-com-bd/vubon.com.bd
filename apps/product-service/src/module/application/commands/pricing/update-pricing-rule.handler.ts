import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdatePricingRuleCommand } from './update-pricing-rule.command.js';
import {
  PRICING_RULE_SERVICE,
  type IProductPricingRuleService,
  type PricingRuleResponseDTO,
} from '../../services/interfaces/product-pricing-rule.service.interface.js';

@CommandHandler(UpdatePricingRuleCommand)
export class UpdatePricingRuleHandler
  implements ICommandHandler<UpdatePricingRuleCommand, PricingRuleResponseDTO>
{
  constructor(
    @Inject(PRICING_RULE_SERVICE)
    private readonly service: IProductPricingRuleService,
  ) {}

  async execute(c: UpdatePricingRuleCommand): Promise<PricingRuleResponseDTO> {
    return this.service.update(c.dto);
  }
}
