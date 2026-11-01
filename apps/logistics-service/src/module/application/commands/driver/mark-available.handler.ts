import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MarkAvailableDriverCommand } from './mark-available.command.js';
import { DRIVER_SERVICE, type IDriverService } from '@application/services/interfaces/driver.service.interface';
import type { DriverResponseDTO } from '@application/dtos/responses/driver/index.js';

@CommandHandler(MarkAvailableDriverCommand)
export class MarkAvailableDriverHandler implements ICommandHandler<MarkAvailableDriverCommand, DriverResponseDTO> {
  constructor(@Inject(DRIVER_SERVICE) private readonly service: IDriverService) {}
  async execute(c: MarkAvailableDriverCommand): Promise<DriverResponseDTO> { return this.service.markAvailable(c.dto, c.actorId); }
}
