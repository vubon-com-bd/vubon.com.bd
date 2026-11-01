import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { StartMaintenanceVehicleCommand } from './start-maintenance.command.js';
import { VEHICLE_SERVICE, type IVehicleService } from '@application/services/interfaces/vehicle.service.interface';
import type { VehicleResponseDTO } from '@application/dtos/responses/vehicle/index.js';

@CommandHandler(StartMaintenanceVehicleCommand)
export class StartMaintenanceVehicleHandler implements ICommandHandler<StartMaintenanceVehicleCommand, VehicleResponseDTO> {
  constructor(@Inject(VEHICLE_SERVICE) private readonly service: IVehicleService) {}
  async execute(c: StartMaintenanceVehicleCommand): Promise<VehicleResponseDTO> { return this.service.startMaintenance(c.dto, c.actorId); }
}
