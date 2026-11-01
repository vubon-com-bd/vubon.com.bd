import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ArchiveInventoryLocationCommand } from './archive.command.js';
import { INVENTORY_LOCATION_SERVICE, type IInventoryLocationService } from '@application/services/interfaces/inventory-location.service.interface';
import type { InventoryLocationResponseDTO } from '@application/dtos/responses/inventory-location/index.js';

@CommandHandler(ArchiveInventoryLocationCommand)
export class ArchiveInventoryLocationHandler implements ICommandHandler<ArchiveInventoryLocationCommand, InventoryLocationResponseDTO> {
  constructor(@Inject(INVENTORY_LOCATION_SERVICE) private readonly service: IInventoryLocationService) {}
  async execute(c: ArchiveInventoryLocationCommand): Promise<InventoryLocationResponseDTO> { return this.service.archive(c.dto, c.actorId); }
}
