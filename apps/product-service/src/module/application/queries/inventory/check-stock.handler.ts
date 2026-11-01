import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CheckStockQuery } from './check-stock.query.js';
import {
  INVENTORY_SERVICE,
  type IProductInventoryService,
} from '../../services/interfaces/product-inventory.service.interface.js';
import type { StockCheckResponseDTO } from '../../dtos/responses/inventory-response.dto.js';

@QueryHandler(CheckStockQuery)
export class CheckStockHandler
  implements IQueryHandler<CheckStockQuery, StockCheckResponseDTO>
{
  constructor(
    @Inject(INVENTORY_SERVICE)
    private readonly service: IProductInventoryService,
  ) {}

  async execute(q: CheckStockQuery): Promise<StockCheckResponseDTO> {
    return this.service.checkStock(q.productId, q.quantity);
  }
}
