import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { CheckStockQuery } from './check-stock.query';
import type { ProductInventoryServiceInterface } from '../../services/interfaces/product-inventory.service.interface';

@QueryHandler(CheckStockQuery)
export class CheckStockHandler
  extends BaseQueryHandler<CheckStockQuery, boolean>
  implements IQueryHandler<CheckStockQuery>
{
  readonly queryType = 'product.inventory.check-stock';

  constructor(private readonly inventoryService: ProductInventoryServiceInterface) {
    super();
  }

  async execute(query: CheckStockQuery): Promise<boolean> {
    const inv = await this.inventoryService.findByProduct(query.productId);
    if (!inv) return false;
    return (inv as unknown as { available: number }).available >= query.quantity;
  }
}
