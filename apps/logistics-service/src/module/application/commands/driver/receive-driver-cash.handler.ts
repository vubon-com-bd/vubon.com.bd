import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ReceiveDriverCashCommand } from './receive-driver-cash.command.js';
import { DRIVER_SERVICE, type IDriverService } from '../../services/interfaces/driver.service.interface.js';
import type { DriverResponseDTO } from '../../dtos/responses/driver/driver-response.dto.js';

@CommandHandler(ReceiveDriverCashCommand)
export class ReceiveDriverCashHandler implements ICommandHandler<ReceiveDriverCashCommand, DriverResponseDTO> {
  constructor(@Inject(DRIVER_SERVICE) private readonly service: IDriverService) {}
  async execute(c: ReceiveDriverCashCommand): Promise<DriverResponseDTO> { return this.service.receiveCash(c.dto, c.actorId); }
}
