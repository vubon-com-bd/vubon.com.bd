import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GoOnLeaveDriverCommand } from './go-on-leave.command.js';
import { DRIVER_SERVICE, type IDriverService } from '@application/services/interfaces/driver.service.interface';
import type { DriverResponseDTO } from '@application/dtos/responses/driver/index.js';

@CommandHandler(GoOnLeaveDriverCommand)
export class GoOnLeaveDriverHandler implements ICommandHandler<GoOnLeaveDriverCommand, DriverResponseDTO> {
  constructor(@Inject(DRIVER_SERVICE) private readonly service: IDriverService) {}
  async execute(c: GoOnLeaveDriverCommand): Promise<DriverResponseDTO> { return this.service.goOnLeave(c.dto, c.actorId); }
}
