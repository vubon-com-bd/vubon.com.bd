import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { GoOffDutyDriverCommand } from './go-off-duty.command.js';
import { DRIVER_SERVICE, type IDriverService } from '@application/services/interfaces/driver.service.interface';
import type { DriverResponseDTO } from '@application/dtos/responses/driver/index.js';

@CommandHandler(GoOffDutyDriverCommand)
export class GoOffDutyDriverHandler implements ICommandHandler<GoOffDutyDriverCommand, DriverResponseDTO> {
  constructor(@Inject(DRIVER_SERVICE) private readonly service: IDriverService) {}
  async execute(c: GoOffDutyDriverCommand): Promise<DriverResponseDTO> { return this.service.goOffDuty(c.dto, c.actorId); }
}
