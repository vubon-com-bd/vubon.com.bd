import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AssignDriverVehicleCommand } from './assign-driver.command.js';
import { VEHICLE_SERVICE, type IVehicleService } from '@application/services/interfaces/vehicle.service.interface';
import type { VehicleResponseDTO } from '@application/dtos/responses/vehicle/index.js';

@CommandHandler(AssignDriverVehicleCommand)
export class AssignDriverVehicleHandler implements ICommandHandler<AssignDriverVehicleCommand, VehicleResponseDTO> {
  constructor(@Inject(VEHICLE_SERVICE) private readonly service: IVehicleService) {}
  async execute(c: AssignDriverVehicleCommand): Promise<VehicleResponseDTO> { return this.service.assignDriver(c.dto, c.actorId); }
}
