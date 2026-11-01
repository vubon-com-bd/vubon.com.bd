import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ReleaseInventoryCommand } from './release-inventory.command.js';
import {
  INVENTORY_SERVICE,
  type IProductInventoryService,
} from '../../services/interfaces/product-inventory.service.interface.js';
import type { InventoryResponseDTO } from '../../dtos/responses/inventory-response.dto.js';

@CommandHandler(ReleaseInventoryCommand)
export class ReleaseInventoryHandler
  implements ICommandHandler<ReleaseInventoryCommand, InventoryResponseDTO>
{
  constructor(
    @Inject(INVENTORY_SERVICE)
    private readonly service: IProductInventoryService,
  ) {}

  async execute(c: ReleaseInventoryCommand): Promise<InventoryResponseDTO> {
    return this.service.release(c.dto);
  }
}
