/**
 * ReserveInventoryHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ReserveInventoryCommand } from './reserve-inventory.command.js';
import { INVENTORY_SERVICE, type IInventoryService } from '../../services/interfaces/inventory.service.interface.js';
import type { InventoryResponseDTO } from '../../dtos/responses/inventory-response.dto.js';

@CommandHandler(ReserveInventoryCommand)
export class ReserveInventoryHandler implements ICommandHandler<ReserveInventoryCommand, InventoryResponseDTO> {
  constructor(@Inject(INVENTORY_SERVICE) private readonly service: IInventoryService) {}
  async execute(c: ReserveInventoryCommand): Promise<InventoryResponseDTO> {
    return this.service.reserve(c.dto);
  }
}
