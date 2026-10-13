import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetInventoryQuery } from './get-inventory.query.js';
import {
  INVENTORY_SERVICE,
  type IProductInventoryService,
} from '../../services/interfaces/product-inventory.service.interface.js';
import type { InventoryResponseDTO } from '../../dtos/responses/inventory-response.dto.js';

@QueryHandler(GetInventoryQuery)
export class GetInventoryHandler
  implements IQueryHandler<GetInventoryQuery, InventoryResponseDTO>
{
  constructor(
    @Inject(INVENTORY_SERVICE)
    private readonly service: IProductInventoryService,
  ) {}

  async execute(q: GetInventoryQuery): Promise<InventoryResponseDTO> {
    return this.service.getById(q.inventoryId);
  }
}
