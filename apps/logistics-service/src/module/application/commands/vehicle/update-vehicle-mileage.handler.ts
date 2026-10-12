import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateVehicleMileageCommand } from './update-vehicle-mileage.command.js';
import { VEHICLE_SERVICE, type IVehicleService } from '../../services/interfaces/vehicle.service.interface.js';
import type { VehicleResponseDTO } from '../../dtos/responses/vehicle/vehicle-response.dto.js';

@CommandHandler(UpdateVehicleMileageCommand)
export class UpdateVehicleMileageHandler implements ICommandHandler<UpdateVehicleMileageCommand, VehicleResponseDTO> {
  constructor(@Inject(VEHICLE_SERVICE) private readonly service: IVehicleService) {}
  async execute(c: UpdateVehicleMileageCommand): Promise<VehicleResponseDTO> { return this.service.updateMileage(c.dto, c.actorId); }
}
