import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdatePriceCommand } from './update-price.command.js';
import {
  PRICING_SERVICE,
  type IProductPricingService,
} from '../../services/interfaces/product-pricing.service.interface.js';
import type { PricingResponseDTO } from '../../dtos/responses/pricing-response.dto.js';

@CommandHandler(UpdatePriceCommand)
export class UpdatePriceHandler
  implements ICommandHandler<UpdatePriceCommand, PricingResponseDTO>
{
  constructor(
    @Inject(PRICING_SERVICE)
    private readonly service: IProductPricingService,
  ) {}

  async execute(c: UpdatePriceCommand): Promise<PricingResponseDTO> {
    return this.service.updatePrice(c.dto);
  }
}
