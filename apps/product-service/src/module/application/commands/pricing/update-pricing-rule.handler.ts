import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdatePricingRuleCommand } from './update-pricing-rule.command';
import type { ProductPricingRuleServiceInterface } from '../../services/interfaces/product-pricing-rule.service.interface';

@CommandHandler(UpdatePricingRuleCommand)
export class UpdatePricingRuleHandler
  extends BaseCommandHandler<UpdatePricingRuleCommand, unknown>
  implements ICommandHandler<UpdatePricingRuleCommand>
{
  readonly commandType = 'product.pricing_rule.update';

  constructor(
    private readonly ruleService: ProductPricingRuleServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdatePricingRuleCommand): Promise<unknown> {
    return this.ruleService.update(command.ruleId, command.value);
  }
}
