import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AssignVehicleDriverCommand } from './assign-vehicle.command.js';
import { DRIVER_SERVICE, type IDriverService } from '@application/services/interfaces/driver.service.interface';
import type { DriverResponseDTO } from '@application/dtos/responses/driver/index.js';

@CommandHandler(AssignVehicleDriverCommand)
export class AssignVehicleDriverHandler implements ICommandHandler<AssignVehicleDriverCommand, DriverResponseDTO> {
  constructor(@Inject(DRIVER_SERVICE) private readonly service: IDriverService) {}
  async execute(c: AssignVehicleDriverCommand): Promise<DriverResponseDTO> { return this.service.assignVehicle(c.dto, c.actorId); }
}
