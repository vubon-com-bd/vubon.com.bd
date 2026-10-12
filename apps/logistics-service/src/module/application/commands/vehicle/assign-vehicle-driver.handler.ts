import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AssignVehicleDriverCommand } from './assign-vehicle-driver.command.js';
import { VEHICLE_SERVICE, type IVehicleService } from '../../services/interfaces/vehicle.service.interface.js';
import type { VehicleResponseDTO } from '../../dtos/responses/vehicle/vehicle-response.dto.js';

@CommandHandler(AssignVehicleDriverCommand)
export class AssignVehicleDriverHandler implements ICommandHandler<AssignVehicleDriverCommand, VehicleResponseDTO> {
  constructor(@Inject(VEHICLE_SERVICE) private readonly service: IVehicleService) {}
  async execute(c: AssignVehicleDriverCommand): Promise<VehicleResponseDTO> { return this.service.assignDriver(c.dto, c.actorId); }
}
