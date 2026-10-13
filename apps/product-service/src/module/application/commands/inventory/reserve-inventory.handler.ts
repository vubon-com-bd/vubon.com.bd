import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ReserveInventoryCommand } from './reserve-inventory.command.js';
import {
  INVENTORY_SERVICE,
  type IProductInventoryService,
} from '../../services/interfaces/product-inventory.service.interface.js';
import type { InventoryResponseDTO } from '../../dtos/responses/inventory-response.dto.js';

@CommandHandler(ReserveInventoryCommand)
export class ReserveInventoryHandler
  implements ICommandHandler<ReserveInventoryCommand, InventoryResponseDTO>
{
  constructor(
    @Inject(INVENTORY_SERVICE)
    private readonly service: IProductInventoryService,
  ) {}

  async execute(c: ReserveInventoryCommand): Promise<InventoryResponseDTO> {
    return this.service.reserve(c.dto);
  }
}
