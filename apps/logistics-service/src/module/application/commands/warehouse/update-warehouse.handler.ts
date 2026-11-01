import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateWarehouseCommand } from './update-warehouse.command.js';
import { WAREHOUSE_SERVICE, type IWarehouseService } from '@application/services/interfaces/warehouse.service.interface';
import type { WarehouseResponseDTO } from '@application/dtos/responses/warehouse/index.js';

@CommandHandler(UpdateWarehouseCommand)
export class UpdateWarehouseHandler implements ICommandHandler<UpdateWarehouseCommand, WarehouseResponseDTO> {
  constructor(@Inject(WAREHOUSE_SERVICE) private readonly service: IWarehouseService) {}
  async execute(c: UpdateWarehouseCommand): Promise<WarehouseResponseDTO> { return this.service.update(c.dto, c.actorId); }
}
