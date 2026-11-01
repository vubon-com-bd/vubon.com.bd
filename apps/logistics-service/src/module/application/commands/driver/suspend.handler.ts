import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SuspendDriverCommand } from './suspend.command.js';
import { DRIVER_SERVICE, type IDriverService } from '@application/services/interfaces/driver.service.interface';
import type { DriverResponseDTO } from '@application/dtos/responses/driver/index.js';

@CommandHandler(SuspendDriverCommand)
export class SuspendDriverHandler implements ICommandHandler<SuspendDriverCommand, DriverResponseDTO> {
  constructor(@Inject(DRIVER_SERVICE) private readonly service: IDriverService) {}
  async execute(c: SuspendDriverCommand): Promise<DriverResponseDTO> { return this.service.suspend(c.dto, c.actorId); }
}
