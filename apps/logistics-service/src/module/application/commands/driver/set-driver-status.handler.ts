import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SetDriverStatusCommand } from './set-driver-status.command.js';
import { DRIVER_SERVICE, type IDriverService } from '../../services/interfaces/driver.service.interface.js';
import type { DriverResponseDTO } from '../../dtos/responses/driver/driver-response.dto.js';

@CommandHandler(SetDriverStatusCommand)
export class SetDriverStatusHandler implements ICommandHandler<SetDriverStatusCommand, DriverResponseDTO> {
  constructor(@Inject(DRIVER_SERVICE) private readonly service: IDriverService) {}
  async execute(c: SetDriverStatusCommand): Promise<DriverResponseDTO> { return this.service.setStatus(c.dto, c.actorId); }
}
