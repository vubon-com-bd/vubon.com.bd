import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UnassignDriverVehicleCommand } from './unassign-driver.command.js';
import { VEHICLE_SERVICE, type IVehicleService } from '@application/services/interfaces/vehicle.service.interface';
import type { VehicleResponseDTO } from '@application/dtos/responses/vehicle/index.js';

@CommandHandler(UnassignDriverVehicleCommand)
export class UnassignDriverVehicleHandler implements ICommandHandler<UnassignDriverVehicleCommand, VehicleResponseDTO> {
  constructor(@Inject(VEHICLE_SERVICE) private readonly service: IVehicleService) {}
  async execute(c: UnassignDriverVehicleCommand): Promise<VehicleResponseDTO> { return this.service.unassignDriver(c.dto, c.actorId); }
}
