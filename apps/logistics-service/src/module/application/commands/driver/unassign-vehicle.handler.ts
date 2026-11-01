import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UnassignVehicleDriverCommand } from './unassign-vehicle.command.js';
import { DRIVER_SERVICE, type IDriverService } from '@application/services/interfaces/driver.service.interface';
import type { DriverResponseDTO } from '@application/dtos/responses/driver/index.js';

@CommandHandler(UnassignVehicleDriverCommand)
export class UnassignVehicleDriverHandler implements ICommandHandler<UnassignVehicleDriverCommand, DriverResponseDTO> {
  constructor(@Inject(DRIVER_SERVICE) private readonly service: IDriverService) {}
  async execute(c: UnassignVehicleDriverCommand): Promise<DriverResponseDTO> { return this.service.unassignVehicle(c.dto, c.actorId); }
}
