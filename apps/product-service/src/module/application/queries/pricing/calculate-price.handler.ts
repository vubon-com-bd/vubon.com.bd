import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { CalculatePriceQuery } from './calculate-price.query';
import type { ProductPricingServiceInterface } from '../../services/interfaces/product-pricing.service.interface';

@QueryHandler(CalculatePriceQuery)
export class CalculatePriceHandler
  extends BaseQueryHandler<CalculatePriceQuery, number>
  implements IQueryHandler<CalculatePriceQuery>
{
  readonly queryType = 'product.pricing.calculate';

  constructor(private readonly pricingService: ProductPricingServiceInterface) {
    super();
  }

  async execute(query: CalculatePriceQuery): Promise<number> {
    return this.pricingService.calculateFinalPrice(query.productId);
  }
}
