/**
 * AdjustInventoryHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AdjustInventoryCommand } from './adjust-inventory.command.js';
import { INVENTORY_SERVICE, type IInventoryService } from '../../services/interfaces/inventory.service.interface.js';
import type { InventoryResponseDTO } from '../../dtos/responses/inventory-response.dto.js';

@CommandHandler(AdjustInventoryCommand)
export class AdjustInventoryHandler implements ICommandHandler<AdjustInventoryCommand, InventoryResponseDTO> {
  constructor(@Inject(INVENTORY_SERVICE) private readonly service: IInventoryService) {}
  async execute(c: AdjustInventoryCommand): Promise<InventoryResponseDTO> {
    return this.service.adjust(c.dto);
  }
}
