import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetInventoryLocationQuery } from './get-inventory-location.query.js';
import { INVENTORY_LOCATION_SERVICE, type IInventoryLocationService } from '@application/services/interfaces/inventory-location.service.interface';
import type { InventoryLocationResponseDTO } from '@application/dtos/responses/inventory-location/index.js';

@QueryHandler(GetInventoryLocationQuery)
export class GetInventoryLocationHandler implements IQueryHandler<GetInventoryLocationQuery, InventoryLocationResponseDTO> {
  constructor(@Inject(INVENTORY_LOCATION_SERVICE) private readonly service: IInventoryLocationService) {}
  async execute(q: GetInventoryLocationQuery): Promise<InventoryLocationResponseDTO> { return this.service.getById(q.inventoryLocationId); }
}
