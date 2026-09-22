import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetInventoryQuery } from './get-inventory.query';
import type { ProductInventoryServiceInterface } from '../../services/interfaces/product-inventory.service.interface';
import type { InventoryResponseDTO } from '../../dtos/responses/inventory-response.dto';

@QueryHandler(GetInventoryQuery)
export class GetInventoryHandler
  extends BaseQueryHandler<GetInventoryQuery, InventoryResponseDTO | null>
  implements IQueryHandler<GetInventoryQuery>
{
  readonly queryType = 'product.inventory.get';

  constructor(private readonly inventoryService: ProductInventoryServiceInterface) {
    super();
  }

  async execute(query: GetInventoryQuery): Promise<InventoryResponseDTO | null> {
    return this.inventoryService.findByProduct(query.productId);
  }
}
