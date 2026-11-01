import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UnquarantineInventoryLocationCommand } from './unquarantine.command.js';
import { INVENTORY_LOCATION_SERVICE, type IInventoryLocationService } from '@application/services/interfaces/inventory-location.service.interface';
import type { InventoryLocationResponseDTO } from '@application/dtos/responses/inventory-location/index.js';

@CommandHandler(UnquarantineInventoryLocationCommand)
export class UnquarantineInventoryLocationHandler implements ICommandHandler<UnquarantineInventoryLocationCommand, InventoryLocationResponseDTO> {
  constructor(@Inject(INVENTORY_LOCATION_SERVICE) private readonly service: IInventoryLocationService) {}
  async execute(c: UnquarantineInventoryLocationCommand): Promise<InventoryLocationResponseDTO> { return this.service.unquarantine(c.dto, c.actorId); }
}
