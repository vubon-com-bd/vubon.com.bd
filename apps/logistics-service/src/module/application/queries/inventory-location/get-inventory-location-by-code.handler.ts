import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetInventoryLocationByCodeQuery } from './get-inventory-location-by-code.query.js';
import { INVENTORY_LOCATION_SERVICE, type IInventoryLocationService } from '@application/services/interfaces/inventory-location.service.interface';
import type { InventoryLocationResponseDTO } from '@application/dtos/responses/inventory-location/index.js';

@QueryHandler(GetInventoryLocationByCodeQuery)
export class GetInventoryLocationByCodeHandler implements IQueryHandler<GetInventoryLocationByCodeQuery, InventoryLocationResponseDTO> {
  constructor(@Inject(INVENTORY_LOCATION_SERVICE) private readonly service: IInventoryLocationService) {}
  async execute(q: GetInventoryLocationByCodeQuery): Promise<InventoryLocationResponseDTO> { return this.service.getByCode(q.code); }
}
