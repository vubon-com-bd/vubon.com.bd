import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ReleaseVehicleCommand } from './release.command.js';
import { VEHICLE_SERVICE, type IVehicleService } from '@application/services/interfaces/vehicle.service.interface';
import type { VehicleResponseDTO } from '@application/dtos/responses/vehicle/index.js';

@CommandHandler(ReleaseVehicleCommand)
export class ReleaseVehicleHandler implements ICommandHandler<ReleaseVehicleCommand, VehicleResponseDTO> {
  constructor(@Inject(VEHICLE_SERVICE) private readonly service: IVehicleService) {}
  async execute(c: ReleaseVehicleCommand): Promise<VehicleResponseDTO> { return this.service.release(c.dto, c.actorId); }
}
