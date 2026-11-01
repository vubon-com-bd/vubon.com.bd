import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ListInventoryLocationsQuery } from './list-inventory-locations.query.js';
import { INVENTORY_LOCATION_SERVICE, type IInventoryLocationService } from '@application/services/interfaces/inventory-location.service.interface';
import type { InventoryLocationListResponseDTO } from '@application/dtos/responses/inventory-location/index.js';

@QueryHandler(ListInventoryLocationsQuery)
export class ListInventoryLocationsHandler implements IQueryHandler<ListInventoryLocationsQuery, InventoryLocationListResponseDTO> {
  constructor(@Inject(INVENTORY_LOCATION_SERVICE) private readonly service: IInventoryLocationService) {}
  async execute(q: ListInventoryLocationsQuery): Promise<InventoryLocationListResponseDTO> { return this.service.list(q.options); }
}
