import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListPickableInventoryLocationsQuery } from './list-pickable-inventory-locations.query.js';
import { INVENTORY_LOCATION_SERVICE, type IInventoryLocationService } from '@application/services/interfaces/inventory-location.service.interface';
import type { InventoryLocationListResponseDTO } from '@application/dtos/responses/inventory-location/index.js';

@QueryHandler(ListPickableInventoryLocationsQuery)
export class ListPickableInventoryLocationsHandler implements IQueryHandler<ListPickableInventoryLocationsQuery, InventoryLocationListResponseDTO> {
  constructor(@Inject(INVENTORY_LOCATION_SERVICE) private readonly service: IInventoryLocationService) {}
  async execute(q: ListPickableInventoryLocationsQuery): Promise<InventoryLocationListResponseDTO> { return this.service.listPickable(q.warehouseId); }
}
