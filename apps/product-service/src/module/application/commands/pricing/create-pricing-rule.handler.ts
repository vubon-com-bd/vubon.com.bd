import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreatePricingRuleCommand } from './create-pricing-rule.command.js';
import {
  PRICING_RULE_SERVICE,
  type IProductPricingRuleService,
  type PricingRuleResponseDTO,
} from '../../services/interfaces/product-pricing-rule.service.interface.js';

@CommandHandler(CreatePricingRuleCommand)
export class CreatePricingRuleHandler
  implements ICommandHandler<CreatePricingRuleCommand, PricingRuleResponseDTO>
{
  constructor(
    @Inject(PRICING_RULE_SERVICE)
    private readonly service: IProductPricingRuleService,
  ) {}

  async execute(c: CreatePricingRuleCommand): Promise<PricingRuleResponseDTO> {
    return this.service.create(c.dto);
  }
}
