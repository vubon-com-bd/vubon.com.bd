/**
 * RemoveDiscountHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RemoveDiscountCommand } from './remove-discount.command.js';
import { PRICING_SERVICE, type IPricingService } from '../../services/interfaces/pricing.service.interface.js';
import type { PricingResponseDTO } from '../../dtos/responses/pricing-response.dto.js';

@CommandHandler(RemoveDiscountCommand)
export class RemoveDiscountHandler implements ICommandHandler<RemoveDiscountCommand, PricingResponseDTO> {
  constructor(@Inject(PRICING_SERVICE) private readonly service: IPricingService) {}
  async execute(c: RemoveDiscountCommand): Promise<PricingResponseDTO> {
    return this.service.removeDiscount(c.productId, c.actorId);
  }
}
