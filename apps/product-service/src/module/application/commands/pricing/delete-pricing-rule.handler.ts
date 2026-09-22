import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { DeletePricingRuleCommand } from './delete-pricing-rule.command';
import type { ProductPricingRuleServiceInterface } from '../../services/interfaces/product-pricing-rule.service.interface';

@CommandHandler(DeletePricingRuleCommand)
export class DeletePricingRuleHandler
  extends BaseCommandHandler<DeletePricingRuleCommand, void>
  implements ICommandHandler<DeletePricingRuleCommand>
{
  readonly commandType = 'product.pricing_rule.delete';

  constructor(
    private readonly ruleService: ProductPricingRuleServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: DeletePricingRuleCommand): Promise<void> {
    await this.ruleService.delete(command.ruleId);
  }
}
