import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPriceQuery } from './get-price.query.js';
import {
  PRICING_SERVICE,
  type IProductPricingService,
} from '../../services/interfaces/product-pricing.service.interface.js';
import type { PricingResponseDTO } from '../../dtos/responses/pricing-response.dto.js';

@QueryHandler(GetPriceQuery)
export class GetPriceHandler
  implements IQueryHandler<GetPriceQuery, PricingResponseDTO>
{
  constructor(
    @Inject(PRICING_SERVICE)
    private readonly service: IProductPricingService,
  ) {}

  async execute(q: GetPriceQuery): Promise<PricingResponseDTO> {
    return this.service.getByProduct(q.productId);
  }
}
