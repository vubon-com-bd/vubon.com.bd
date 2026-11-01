import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AddStockInventoryLocationCommand } from './add-stock.command.js';
import { INVENTORY_LOCATION_SERVICE, type IInventoryLocationService } from '@application/services/interfaces/inventory-location.service.interface';
import type { InventoryLocationResponseDTO } from '@application/dtos/responses/inventory-location/index.js';

@CommandHandler(AddStockInventoryLocationCommand)
export class AddStockInventoryLocationHandler implements ICommandHandler<AddStockInventoryLocationCommand, InventoryLocationResponseDTO> {
  constructor(@Inject(INVENTORY_LOCATION_SERVICE) private readonly service: IInventoryLocationService) {}
  async execute(c: AddStockInventoryLocationCommand): Promise<InventoryLocationResponseDTO> { return this.service.addStock(c.dto, c.actorId); }
}
