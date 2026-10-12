import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SetVehicleStatusCommand } from './set-vehicle-status.command.js';
import { VEHICLE_SERVICE, type IVehicleService } from '../../services/interfaces/vehicle.service.interface.js';
import type { VehicleResponseDTO } from '../../dtos/responses/vehicle/vehicle-response.dto.js';

@CommandHandler(SetVehicleStatusCommand)
export class SetVehicleStatusHandler implements ICommandHandler<SetVehicleStatusCommand, VehicleResponseDTO> {
  constructor(@Inject(VEHICLE_SERVICE) private readonly service: IVehicleService) {}
  async execute(c: SetVehicleStatusCommand): Promise<VehicleResponseDTO> { return this.service.setStatus(c.dto, c.actorId); }
}
