import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DepositCashDriverCommand } from './deposit-cash.command.js';
import { DRIVER_SERVICE, type IDriverService } from '@application/services/interfaces/driver.service.interface';
import type { DriverResponseDTO } from '@application/dtos/responses/driver/index.js';

@CommandHandler(DepositCashDriverCommand)
export class DepositCashDriverHandler implements ICommandHandler<DepositCashDriverCommand, DriverResponseDTO> {
  constructor(@Inject(DRIVER_SERVICE) private readonly service: IDriverService) {}
  async execute(c: DepositCashDriverCommand): Promise<DriverResponseDTO> { return this.service.depositCash(c.dto, c.actorId); }
}
