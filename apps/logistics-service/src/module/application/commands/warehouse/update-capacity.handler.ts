import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateCapacityCommand } from './update-capacity.command.js';
import { WAREHOUSE_SERVICE, type IWarehouseService } from '@application/services/interfaces/warehouse.service.interface';
import type { WarehouseResponseDTO } from '@application/dtos/responses/warehouse/index.js';

@CommandHandler(UpdateCapacityCommand)
export class UpdateCapacityHandler implements ICommandHandler<UpdateCapacityCommand, WarehouseResponseDTO> {
  constructor(@Inject(WAREHOUSE_SERVICE) private readonly service: IWarehouseService) {}
  async execute(c: UpdateCapacityCommand): Promise<WarehouseResponseDTO> { return this.service.updateCapacity(c.dto, c.actorId); }
}
