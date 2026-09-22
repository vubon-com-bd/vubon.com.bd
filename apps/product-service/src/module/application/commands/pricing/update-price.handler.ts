import { CommandHandler, ICommandHandler, EventBus } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { UpdatePriceCommand } from './update-price.command';
import type { ProductPricingServiceInterface } from '../../services/interfaces/product-pricing.service.interface';
import type { PricingResponseDTO } from '../../dtos/responses/pricing-response.dto';

@CommandHandler(UpdatePriceCommand)
export class UpdatePriceHandler
  extends BaseCommandHandler<UpdatePriceCommand, PricingResponseDTO>
  implements ICommandHandler<UpdatePriceCommand>
{
  readonly commandType = 'product.price.update';

  constructor(
    private readonly pricingService: ProductPricingServiceInterface,
    private readonly eventBus: EventBus,
  ) {
    super();
  }

  async execute(command: UpdatePriceCommand): Promise<PricingResponseDTO> {
    return this.pricingService.updatePrice(
      command.productId,
      command.amount,
      command.currency,
    );
  }
}
