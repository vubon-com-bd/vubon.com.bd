import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeactivateWarehouseCommand } from './deactivate-warehouse.command.js';
import { WAREHOUSE_SERVICE, type IWarehouseService } from '@application/services/interfaces/warehouse.service.interface';
import type { WarehouseResponseDTO } from '@application/dtos/responses/warehouse/index.js';

@CommandHandler(DeactivateWarehouseCommand)
export class DeactivateWarehouseHandler implements ICommandHandler<DeactivateWarehouseCommand, WarehouseResponseDTO> {
  constructor(@Inject(WAREHOUSE_SERVICE) private readonly service: IWarehouseService) {}
  async execute(c: DeactivateWarehouseCommand): Promise<WarehouseResponseDTO> { return this.service.deactivate(c.dto, c.actorId); }
}
