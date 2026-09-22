import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetPriceQuery } from './get-price.query';
import type { ProductPricingServiceInterface } from '../../services/interfaces/product-pricing.service.interface';
import type { PricingResponseDTO } from '../../dtos/responses/pricing-response.dto';

@QueryHandler(GetPriceQuery)
export class GetPriceHandler
  extends BaseQueryHandler<GetPriceQuery, PricingResponseDTO | null>
  implements IQueryHandler<GetPriceQuery>
{
  readonly queryType = 'product.pricing.get-price';

  constructor(private readonly pricingService: ProductPricingServiceInterface) {
    super();
  }

  async execute(query: GetPriceQuery): Promise<PricingResponseDTO | null> {
    return this.pricingService.findByProduct(query.productId);
  }
}
