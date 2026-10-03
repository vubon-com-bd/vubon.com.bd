import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListInventoryByProductQuery } from './list-inventory-by-product.query.js';
import { INVENTORY_SERVICE, type IInventoryService } from '../../services/interfaces/inventory.service.interface.js';
import type { InventoryResponseDTO } from '../../dtos/responses/inventory-response.dto.js';

@QueryHandler(ListInventoryByProductQuery)
export class ListInventoryByProductHandler
  implements IQueryHandler<ListInventoryByProductQuery, readonly InventoryResponseDTO[]>
{
  constructor(@Inject(INVENTORY_SERVICE) private readonly service: IInventoryService) {}
  async execute(q: ListInventoryByProductQuery): Promise<readonly InventoryResponseDTO[]> {
    return this.service.listByProduct(q.productId);
  }
}
