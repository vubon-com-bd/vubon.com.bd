import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AssignDriverVehicleCommand } from './assign-driver-vehicle.command.js';
import { DRIVER_SERVICE, type IDriverService } from '../../services/interfaces/driver.service.interface.js';
import type { DriverResponseDTO } from '../../dtos/responses/driver/driver-response.dto.js';

@CommandHandler(AssignDriverVehicleCommand)
export class AssignDriverVehicleHandler implements ICommandHandler<AssignDriverVehicleCommand, DriverResponseDTO> {
  constructor(@Inject(DRIVER_SERVICE) private readonly service: IDriverService) {}
  async execute(c: AssignDriverVehicleCommand): Promise<DriverResponseDTO> { return this.service.assignVehicle(c.dto, c.actorId); }
}
