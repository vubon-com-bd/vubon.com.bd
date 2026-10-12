import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateWarehouseCommand } from './update-warehouse.command.js';
import { WAREHOUSE_SERVICE, type IWarehouseService } from '../../services/interfaces/warehouse.service.interface.js';
import type { WarehouseResponseDTO } from '../../dtos/responses/warehouse/warehouse-response.dto.js';

@CommandHandler(UpdateWarehouseCommand)
export class UpdateWarehouseHandler implements ICommandHandler<UpdateWarehouseCommand, WarehouseResponseDTO> {
  constructor(@Inject(WAREHOUSE_SERVICE) private readonly service: IWarehouseService) {}
  async execute(c: UpdateWarehouseCommand): Promise<WarehouseResponseDTO> { return this.service.update(c.dto, c.actorId); }
}
