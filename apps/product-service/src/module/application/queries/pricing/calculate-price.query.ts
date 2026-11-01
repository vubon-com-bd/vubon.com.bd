import { BaseQuery } from '@vubon/shared-kernel/application/queries';
import type { PriceCalculationInputDTO } from '../../services/interfaces/product-pricing.service.interface.js';

export class CalculatePriceQuery extends BaseQuery {
  readonly type = 'product.pricing.calculate';
  constructor(public readonly input: PriceCalculationInputDTO) {
    super();
  }
}
