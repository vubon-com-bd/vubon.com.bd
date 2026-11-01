import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CloseWarehouseCommand } from './close-warehouse.command.js';
import { WAREHOUSE_SERVICE, type IWarehouseService } from '@application/services/interfaces/warehouse.service.interface';
import type { WarehouseResponseDTO } from '@application/dtos/responses/warehouse/index.js';

@CommandHandler(CloseWarehouseCommand)
export class CloseWarehouseHandler implements ICommandHandler<CloseWarehouseCommand, WarehouseResponseDTO> {
  constructor(@Inject(WAREHOUSE_SERVICE) private readonly service: IWarehouseService) {}
  async execute(c: CloseWarehouseCommand): Promise<WarehouseResponseDTO> { return this.service.close(c.dto, c.actorId); }
}
