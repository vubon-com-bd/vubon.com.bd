import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListInventoryLocationsByZoneQuery } from './list-inventory-locations-by-zone.query.js';
import { INVENTORY_LOCATION_SERVICE, type IInventoryLocationService } from '@application/services/interfaces/inventory-location.service.interface';
import type { InventoryLocationListResponseDTO } from '@application/dtos/responses/inventory-location/index.js';

@QueryHandler(ListInventoryLocationsByZoneQuery)
export class ListInventoryLocationsByZoneHandler implements IQueryHandler<ListInventoryLocationsByZoneQuery, InventoryLocationListResponseDTO> {
  constructor(@Inject(INVENTORY_LOCATION_SERVICE) private readonly service: IInventoryLocationService) {}
  async execute(q: ListInventoryLocationsByZoneQuery): Promise<InventoryLocationListResponseDTO> {
    return this.service.listByZone(q.warehouseId, q.zone);
  }
}
