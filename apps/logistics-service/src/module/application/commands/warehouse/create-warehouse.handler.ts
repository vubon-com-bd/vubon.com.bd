import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateWarehouseCommand } from './create-warehouse.command.js';
import { WAREHOUSE_SERVICE, type IWarehouseService } from '../../services/interfaces/warehouse.service.interface.js';
import type { WarehouseResponseDTO } from '../../dtos/responses/warehouse/warehouse-response.dto.js';

@CommandHandler(CreateWarehouseCommand)
export class CreateWarehouseHandler implements ICommandHandler<CreateWarehouseCommand, WarehouseResponseDTO> {
  constructor(@Inject(WAREHOUSE_SERVICE) private readonly service: IWarehouseService) {}
  async execute(c: CreateWarehouseCommand): Promise<WarehouseResponseDTO> { return this.service.create(c.dto, c.actorId); }
}
