import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CompleteMaintenanceVehicleCommand } from './complete-maintenance.command.js';
import { VEHICLE_SERVICE, type IVehicleService } from '@application/services/interfaces/vehicle.service.interface';
import type { VehicleResponseDTO } from '@application/dtos/responses/vehicle/index.js';

@CommandHandler(CompleteMaintenanceVehicleCommand)
export class CompleteMaintenanceVehicleHandler implements ICommandHandler<CompleteMaintenanceVehicleCommand, VehicleResponseDTO> {
  constructor(@Inject(VEHICLE_SERVICE) private readonly service: IVehicleService) {}
  async execute(c: CompleteMaintenanceVehicleCommand): Promise<VehicleResponseDTO> { return this.service.completeMaintenance(c.dto, c.actorId); }
}
