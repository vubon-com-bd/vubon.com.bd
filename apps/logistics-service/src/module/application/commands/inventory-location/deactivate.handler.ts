import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeactivateInventoryLocationCommand } from './deactivate.command.js';
import { INVENTORY_LOCATION_SERVICE, type IInventoryLocationService } from '@application/services/interfaces/inventory-location.service.interface';
import type { InventoryLocationResponseDTO } from '@application/dtos/responses/inventory-location/index.js';

@CommandHandler(DeactivateInventoryLocationCommand)
export class DeactivateInventoryLocationHandler implements ICommandHandler<DeactivateInventoryLocationCommand, InventoryLocationResponseDTO> {
  constructor(@Inject(INVENTORY_LOCATION_SERVICE) private readonly service: IInventoryLocationService) {}
  async execute(c: DeactivateInventoryLocationCommand): Promise<InventoryLocationResponseDTO> { return this.service.deactivate(c.dto, c.actorId); }
}
