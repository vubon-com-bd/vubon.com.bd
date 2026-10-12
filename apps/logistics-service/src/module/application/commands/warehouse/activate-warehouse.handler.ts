import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ActivateWarehouseCommand } from './activate-warehouse.command.js';
import { WAREHOUSE_SERVICE, type IWarehouseService } from '../../services/interfaces/warehouse.service.interface.js';
import type { WarehouseResponseDTO } from '../../dtos/responses/warehouse/warehouse-response.dto.js';

@CommandHandler(ActivateWarehouseCommand)
export class ActivateWarehouseHandler implements ICommandHandler<ActivateWarehouseCommand, WarehouseResponseDTO> {
  constructor(@Inject(WAREHOUSE_SERVICE) private readonly service: IWarehouseService) {}
  async execute(c: ActivateWarehouseCommand): Promise<WarehouseResponseDTO> { return this.service.activate(c.dto, c.actorId); }
}
