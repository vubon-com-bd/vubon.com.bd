import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListLowStockQuery } from './list-low-stock.query.js';
import { INVENTORY_SERVICE, type IInventoryService } from '../../services/interfaces/inventory.service.interface.js';
import type { InventoryResponseDTO } from '../../dtos/responses/inventory-response.dto.js';

@QueryHandler(ListLowStockQuery)
export class ListLowStockHandler
  implements IQueryHandler<ListLowStockQuery, readonly InventoryResponseDTO[]>
{
  constructor(@Inject(INVENTORY_SERVICE) private readonly service: IInventoryService) {}
  async execute(): Promise<readonly InventoryResponseDTO[]> {
    return this.service.listLowStock();
  }
}
