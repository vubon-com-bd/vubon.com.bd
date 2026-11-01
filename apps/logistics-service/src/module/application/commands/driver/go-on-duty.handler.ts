import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GoOnDutyDriverCommand } from './go-on-duty.command.js';
import { DRIVER_SERVICE, type IDriverService } from '@application/services/interfaces/driver.service.interface';
import type { DriverResponseDTO } from '@application/dtos/responses/driver/index.js';

@CommandHandler(GoOnDutyDriverCommand)
export class GoOnDutyDriverHandler implements ICommandHandler<GoOnDutyDriverCommand, DriverResponseDTO> {
  constructor(@Inject(DRIVER_SERVICE) private readonly service: IDriverService) {}
  async execute(c: GoOnDutyDriverCommand): Promise<DriverResponseDTO> { return this.service.goOnDuty(c.dto, c.actorId); }
}
