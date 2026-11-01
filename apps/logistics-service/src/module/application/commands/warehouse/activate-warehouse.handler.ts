import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ActivateWarehouseCommand } from './activate-warehouse.command.js';
import { WAREHOUSE_SERVICE, type IWarehouseService } from '@application/services/interfaces/warehouse.service.interface';
import type { WarehouseResponseDTO } from '@application/dtos/responses/warehouse/index.js';

@CommandHandler(ActivateWarehouseCommand)
export class ActivateWarehouseHandler implements ICommandHandler<ActivateWarehouseCommand, WarehouseResponseDTO> {
  constructor(@Inject(WAREHOUSE_SERVICE) private readonly service: IWarehouseService) {}
  async execute(c: ActivateWarehouseCommand): Promise<WarehouseResponseDTO> { return this.service.activate(c.dto, c.actorId); }
}
