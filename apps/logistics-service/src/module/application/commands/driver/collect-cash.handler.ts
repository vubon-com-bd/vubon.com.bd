import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CollectCashDriverCommand } from './collect-cash.command.js';
import { DRIVER_SERVICE, type IDriverService } from '@application/services/interfaces/driver.service.interface';
import type { DriverResponseDTO } from '@application/dtos/responses/driver/index.js';

@CommandHandler(CollectCashDriverCommand)
export class CollectCashDriverHandler implements ICommandHandler<CollectCashDriverCommand, DriverResponseDTO> {
  constructor(@Inject(DRIVER_SERVICE) private readonly service: IDriverService) {}
  async execute(c: CollectCashDriverCommand): Promise<DriverResponseDTO> { return this.service.collectCash(c.dto, c.actorId); }
}
