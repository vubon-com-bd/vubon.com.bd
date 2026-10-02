/**
 * ApplyDiscountHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ApplyDiscountCommand } from './apply-discount.command.js';
import { PRICING_SERVICE, type IPricingService } from '../../services/interfaces/pricing.service.interface.js';
import type { PricingResponseDTO } from '../../dtos/responses/pricing-response.dto.js';

@CommandHandler(ApplyDiscountCommand)
export class ApplyDiscountHandler implements ICommandHandler<ApplyDiscountCommand, PricingResponseDTO> {
  constructor(@Inject(PRICING_SERVICE) private readonly service: IPricingService) {}
  async execute(c: ApplyDiscountCommand): Promise<PricingResponseDTO> {
    return this.service.applyDiscount(c.productId, c.discountPercent, c.actorId);
  }
}
