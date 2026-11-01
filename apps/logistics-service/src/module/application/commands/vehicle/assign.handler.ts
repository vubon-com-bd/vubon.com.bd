import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AssignVehicleCommand } from './assign.command.js';
import { VEHICLE_SERVICE, type IVehicleService } from '@application/services/interfaces/vehicle.service.interface';
import type { VehicleResponseDTO } from '@application/dtos/responses/vehicle/index.js';

@CommandHandler(AssignVehicleCommand)
export class AssignVehicleHandler implements ICommandHandler<AssignVehicleCommand, VehicleResponseDTO> {
  constructor(@Inject(VEHICLE_SERVICE) private readonly service: IVehicleService) {}
  async execute(c: AssignVehicleCommand): Promise<VehicleResponseDTO> { return this.service.assign(c.dto, c.actorId); }
}
