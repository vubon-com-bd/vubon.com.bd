import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RemitDriverCashCommand } from './remit-driver-cash.command.js';
import { DRIVER_SERVICE, type IDriverService } from '../../services/interfaces/driver.service.interface.js';
import type { DriverResponseDTO } from '../../dtos/responses/driver/driver-response.dto.js';

@CommandHandler(RemitDriverCashCommand)
export class RemitDriverCashHandler implements ICommandHandler<RemitDriverCashCommand, DriverResponseDTO> {
  constructor(@Inject(DRIVER_SERVICE) private readonly service: IDriverService) {}
  async execute(c: RemitDriverCashCommand): Promise<DriverResponseDTO> { return this.service.remitCash(c.dto, c.actorId); }
}
