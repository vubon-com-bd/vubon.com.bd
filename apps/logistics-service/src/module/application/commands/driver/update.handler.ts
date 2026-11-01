import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateDriverCommand } from './update.command.js';
import { DRIVER_SERVICE, type IDriverService } from '@application/services/interfaces/driver.service.interface';
import type { DriverResponseDTO } from '@application/dtos/responses/driver/index.js';

@CommandHandler(UpdateDriverCommand)
export class UpdateDriverHandler implements ICommandHandler<UpdateDriverCommand, DriverResponseDTO> {
  constructor(@Inject(DRIVER_SERVICE) private readonly service: IDriverService) {}
  async execute(c: UpdateDriverCommand): Promise<DriverResponseDTO> { return this.service.update(c.dto, c.actorId); }
}
