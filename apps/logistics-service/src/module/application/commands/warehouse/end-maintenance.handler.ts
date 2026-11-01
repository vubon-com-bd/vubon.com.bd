import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { EndMaintenanceCommand } from './end-maintenance.command.js';
import { WAREHOUSE_SERVICE, type IWarehouseService } from '@application/services/interfaces/warehouse.service.interface';
import type { WarehouseResponseDTO } from '@application/dtos/responses/warehouse/index.js';

@CommandHandler(EndMaintenanceCommand)
export class EndMaintenanceHandler implements ICommandHandler<EndMaintenanceCommand, WarehouseResponseDTO> {
  constructor(@Inject(WAREHOUSE_SERVICE) private readonly service: IWarehouseService) {}
  async execute(c: EndMaintenanceCommand): Promise<WarehouseResponseDTO> { return this.service.endMaintenance(c.dto, c.actorId); }
}
