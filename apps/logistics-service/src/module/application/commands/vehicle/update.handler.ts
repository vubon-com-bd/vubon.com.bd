import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateVehicleCommand } from './update.command.js';
import { VEHICLE_SERVICE, type IVehicleService } from '@application/services/interfaces/vehicle.service.interface';
import type { VehicleResponseDTO } from '@application/dtos/responses/vehicle/index.js';

@CommandHandler(UpdateVehicleCommand)
export class UpdateVehicleHandler implements ICommandHandler<UpdateVehicleCommand, VehicleResponseDTO> {
  constructor(@Inject(VEHICLE_SERVICE) private readonly service: IVehicleService) {}
  async execute(c: UpdateVehicleCommand): Promise<VehicleResponseDTO> { return this.service.update(c.dto, c.actorId); }
}
