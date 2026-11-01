import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GoOnBreakDriverCommand } from './go-on-break.command.js';
import { DRIVER_SERVICE, type IDriverService } from '@application/services/interfaces/driver.service.interface';
import type { DriverResponseDTO } from '@application/dtos/responses/driver/index.js';

@CommandHandler(GoOnBreakDriverCommand)
export class GoOnBreakDriverHandler implements ICommandHandler<GoOnBreakDriverCommand, DriverResponseDTO> {
  constructor(@Inject(DRIVER_SERVICE) private readonly service: IDriverService) {}
  async execute(c: GoOnBreakDriverCommand): Promise<DriverResponseDTO> { return this.service.goOnBreak(c.dto, c.actorId); }
}
