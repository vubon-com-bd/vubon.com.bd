import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateInventoryLocationCommand } from './update.command.js';
import { INVENTORY_LOCATION_SERVICE, type IInventoryLocationService } from '@application/services/interfaces/inventory-location.service.interface';
import type { InventoryLocationResponseDTO } from '@application/dtos/responses/inventory-location/index.js';

@CommandHandler(UpdateInventoryLocationCommand)
export class UpdateInventoryLocationHandler implements ICommandHandler<UpdateInventoryLocationCommand, InventoryLocationResponseDTO> {
  constructor(@Inject(INVENTORY_LOCATION_SERVICE) private readonly service: IInventoryLocationService) {}
  async execute(c: UpdateInventoryLocationCommand): Promise<InventoryLocationResponseDTO> { return this.service.update(c.dto, c.actorId); }
}
