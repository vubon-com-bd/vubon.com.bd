import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreatePricingRuleCommand } from './create-pricing-rule.command';
import type { ProductPricingRuleServiceInterface } from '../../services/interfaces/product-pricing-rule.service.interface';

@CommandHandler(CreatePricingRuleCommand)
export class CreatePricingRuleHandler
  extends BaseCommandHandler<CreatePricingRuleCommand, unknown>
  implements ICommandHandler<CreatePricingRuleCommand>
{
  readonly commandType = 'product.pricing_rule.create';

  constructor(
    private readonly ruleService: ProductPricingRuleServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: CreatePricingRuleCommand): Promise<unknown> {
    return this.ruleService.create(command.productId, {
      productId: command.productId,
      type: command.ruleType as never,
      value: command.value,
      startAt: command.startAt,
      endAt: command.endAt,
    });
  }
}
