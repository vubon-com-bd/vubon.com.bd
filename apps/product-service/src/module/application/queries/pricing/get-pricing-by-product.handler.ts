import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetPricingByProductQuery } from './get-pricing-by-product.query.js';
import { PRICING_SERVICE, type IPricingService } from '../../services/interfaces/pricing.service.interface.js';
import type { PricingResponseDTO } from '../../dtos/responses/pricing-response.dto.js';

@QueryHandler(GetPricingByProductQuery)
export class GetPricingByProductHandler implements IQueryHandler<GetPricingByProductQuery, PricingResponseDTO | null> {
  constructor(@Inject(PRICING_SERVICE) private readonly service: IPricingService) {}
  async execute(q: GetPricingByProductQuery): Promise<PricingResponseDTO | null> {
    return this.service.getByProduct(q.productId);
  }
}
