import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GetInventoryLocationByBarcodeQuery } from './get-inventory-location-by-barcode.query.js';
import { INVENTORY_LOCATION_SERVICE, type IInventoryLocationService } from '@application/services/interfaces/inventory-location.service.interface';
import type { InventoryLocationResponseDTO } from '@application/dtos/responses/inventory-location/index.js';

@QueryHandler(GetInventoryLocationByBarcodeQuery)
export class GetInventoryLocationByBarcodeHandler implements IQueryHandler<GetInventoryLocationByBarcodeQuery, InventoryLocationResponseDTO> {
  constructor(@Inject(INVENTORY_LOCATION_SERVICE) private readonly service: IInventoryLocationService) {}
  async execute(q: GetInventoryLocationByBarcodeQuery): Promise<InventoryLocationResponseDTO> { return this.service.getByBarcode(q.barcode); }
}
