/**
 * UpdateInventoryHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateInventoryCommand } from './update-inventory.command.js';
import { INVENTORY_SERVICE, type IInventoryService } from '../../services/interfaces/inventory.service.interface.js';
import type { InventoryResponseDTO } from '../../dtos/responses/inventory-response.dto.js';

@CommandHandler(UpdateInventoryCommand)
export class UpdateInventoryHandler implements ICommandHandler<UpdateInventoryCommand, InventoryResponseDTO> {
  constructor(@Inject(INVENTORY_SERVICE) private readonly service: IInventoryService) {}
  async execute(c: UpdateInventoryCommand): Promise<InventoryResponseDTO> {
    return this.service.update(c.dto, c.actorId);
  }
}
