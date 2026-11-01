import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CalculatePriceQuery } from './calculate-price.query.js';
import {
  PRICING_SERVICE,
  type IProductPricingService,
} from '../../services/interfaces/product-pricing.service.interface.js';
import type { PriceCalculationResponseDTO } from '../../dtos/responses/pricing-response.dto.js';

@QueryHandler(CalculatePriceQuery)
export class CalculatePriceHandler
  implements IQueryHandler<CalculatePriceQuery, PriceCalculationResponseDTO>
{
  constructor(
    @Inject(PRICING_SERVICE)
    private readonly service: IProductPricingService,
  ) {}

  async execute(q: CalculatePriceQuery): Promise<PriceCalculationResponseDTO> {
    return this.service.calculate(q.input);
  }
}
