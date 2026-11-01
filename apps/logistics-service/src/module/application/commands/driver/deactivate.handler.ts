import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeactivateDriverCommand } from './deactivate.command.js';
import { DRIVER_SERVICE, type IDriverService } from '@application/services/interfaces/driver.service.interface';
import type { DriverResponseDTO } from '@application/dtos/responses/driver/index.js';

@CommandHandler(DeactivateDriverCommand)
export class DeactivateDriverHandler implements ICommandHandler<DeactivateDriverCommand, DriverResponseDTO> {
  constructor(@Inject(DRIVER_SERVICE) private readonly service: IDriverService) {}
  async execute(c: DeactivateDriverCommand): Promise<DriverResponseDTO> { return this.service.deactivate(c.dto, c.actorId); }
}
