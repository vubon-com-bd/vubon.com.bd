import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateDriverCommand } from './update-driver.command.js';
import { DRIVER_SERVICE, type IDriverService } from '../../services/interfaces/driver.service.interface.js';
import type { DriverResponseDTO } from '../../dtos/responses/driver/driver-response.dto.js';

@CommandHandler(UpdateDriverCommand)
export class UpdateDriverHandler implements ICommandHandler<UpdateDriverCommand, DriverResponseDTO> {
  constructor(@Inject(DRIVER_SERVICE) private readonly service: IDriverService) {}
  async execute(c: UpdateDriverCommand): Promise<DriverResponseDTO> { return this.service.update(c.dto, c.actorId); }
}
