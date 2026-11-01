import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateInventoryLocationCommand } from './create-inventory-location.command.js';
import { INVENTORY_LOCATION_SERVICE, type IInventoryLocationService } from '@application/services/interfaces/inventory-location.service.interface';
import type { InventoryLocationResponseDTO } from '@application/dtos/responses/inventory-location/index.js';

@CommandHandler(CreateInventoryLocationCommand)
export class CreateInventoryLocationHandler implements ICommandHandler<CreateInventoryLocationCommand, InventoryLocationResponseDTO> {
  constructor(@Inject(INVENTORY_LOCATION_SERVICE) private readonly service: IInventoryLocationService) {}
  async execute(c: CreateInventoryLocationCommand): Promise<InventoryLocationResponseDTO> { return this.service.create(c.dto, c.actorId); }
}
