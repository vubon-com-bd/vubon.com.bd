import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { QuarantineInventoryLocationCommand } from './quarantine.command.js';
import { INVENTORY_LOCATION_SERVICE, type IInventoryLocationService } from '@application/services/interfaces/inventory-location.service.interface';
import type { InventoryLocationResponseDTO } from '@application/dtos/responses/inventory-location/index.js';

@CommandHandler(QuarantineInventoryLocationCommand)
export class QuarantineInventoryLocationHandler implements ICommandHandler<QuarantineInventoryLocationCommand, InventoryLocationResponseDTO> {
  constructor(@Inject(INVENTORY_LOCATION_SERVICE) private readonly service: IInventoryLocationService) {}
  async execute(c: QuarantineInventoryLocationCommand): Promise<InventoryLocationResponseDTO> { return this.service.quarantine(c.dto, c.actorId); }
}
