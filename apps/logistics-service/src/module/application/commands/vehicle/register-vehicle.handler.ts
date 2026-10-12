import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RegisterVehicleCommand } from './register-vehicle.command.js';
import { VEHICLE_SERVICE, type IVehicleService } from '../../services/interfaces/vehicle.service.interface.js';
import type { VehicleResponseDTO } from '../../dtos/responses/vehicle/vehicle-response.dto.js';

@CommandHandler(RegisterVehicleCommand)
export class RegisterVehicleHandler implements ICommandHandler<RegisterVehicleCommand, VehicleResponseDTO> {
  constructor(@Inject(VEHICLE_SERVICE) private readonly service: IVehicleService) {}
  async execute(c: RegisterVehicleCommand): Promise<VehicleResponseDTO> { return this.service.register(c.dto, c.actorId); }
}
