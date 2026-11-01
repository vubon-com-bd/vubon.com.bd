import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RemoveStockInventoryLocationCommand } from './remove-stock.command.js';
import { INVENTORY_LOCATION_SERVICE, type IInventoryLocationService } from '@application/services/interfaces/inventory-location.service.interface';
import type { InventoryLocationResponseDTO } from '@application/dtos/responses/inventory-location/index.js';

@CommandHandler(RemoveStockInventoryLocationCommand)
export class RemoveStockInventoryLocationHandler implements ICommandHandler<RemoveStockInventoryLocationCommand, InventoryLocationResponseDTO> {
  constructor(@Inject(INVENTORY_LOCATION_SERVICE) private readonly service: IInventoryLocationService) {}
  async execute(c: RemoveStockInventoryLocationCommand): Promise<InventoryLocationResponseDTO> { return this.service.removeStock(c.dto, c.actorId); }
}
