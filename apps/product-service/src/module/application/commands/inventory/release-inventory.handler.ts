/**
 * ReleaseInventoryHandler
 */
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ReleaseInventoryCommand } from './release-inventory.command.js';
import { INVENTORY_SERVICE, type IInventoryService } from '../../services/interfaces/inventory.service.interface.js';
import type { InventoryResponseDTO } from '../../dtos/responses/inventory-response.dto.js';

@CommandHandler(ReleaseInventoryCommand)
export class ReleaseInventoryHandler implements ICommandHandler<ReleaseInventoryCommand, InventoryResponseDTO> {
  constructor(@Inject(INVENTORY_SERVICE) private readonly service: IInventoryService) {}
  async execute(c: ReleaseInventoryCommand): Promise<InventoryResponseDTO> {
    return this.service.release(c.dto);
  }
}
