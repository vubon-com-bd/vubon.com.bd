import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ActivateInventoryLocationCommand } from './activate.command.js';
import { INVENTORY_LOCATION_SERVICE, type IInventoryLocationService } from '@application/services/interfaces/inventory-location.service.interface';
import type { InventoryLocationResponseDTO } from '@application/dtos/responses/inventory-location/index.js';

@CommandHandler(ActivateInventoryLocationCommand)
export class ActivateInventoryLocationHandler implements ICommandHandler<ActivateInventoryLocationCommand, InventoryLocationResponseDTO> {
  constructor(@Inject(INVENTORY_LOCATION_SERVICE) private readonly service: IInventoryLocationService) {}
  async execute(c: ActivateInventoryLocationCommand): Promise<InventoryLocationResponseDTO> { return this.service.activate(c.dto, c.actorId); }
}
