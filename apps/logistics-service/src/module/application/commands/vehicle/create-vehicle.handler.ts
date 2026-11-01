import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateVehicleCommand } from './create-vehicle.command.js';
import { VEHICLE_SERVICE, type IVehicleService } from '@application/services/interfaces/vehicle.service.interface';
import type { VehicleResponseDTO } from '@application/dtos/responses/vehicle/index.js';

@CommandHandler(CreateVehicleCommand)
export class CreateVehicleHandler implements ICommandHandler<CreateVehicleCommand, VehicleResponseDTO> {
  constructor(@Inject(VEHICLE_SERVICE) private readonly service: IVehicleService) {}
  async execute(c: CreateVehicleCommand): Promise<VehicleResponseDTO> { return this.service.create(c.dto, c.actorId); }
}
