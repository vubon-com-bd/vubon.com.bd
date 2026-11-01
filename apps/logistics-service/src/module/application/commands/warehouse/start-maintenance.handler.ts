import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { StartMaintenanceCommand } from './start-maintenance.command.js';
import { WAREHOUSE_SERVICE, type IWarehouseService } from '@application/services/interfaces/warehouse.service.interface';
import type { WarehouseResponseDTO } from '@application/dtos/responses/warehouse/index.js';

@CommandHandler(StartMaintenanceCommand)
export class StartMaintenanceHandler implements ICommandHandler<StartMaintenanceCommand, WarehouseResponseDTO> {
  constructor(@Inject(WAREHOUSE_SERVICE) private readonly service: IWarehouseService) {}
  async execute(c: StartMaintenanceCommand): Promise<WarehouseResponseDTO> { return this.service.startMaintenance(c.dto, c.actorId); }
}
