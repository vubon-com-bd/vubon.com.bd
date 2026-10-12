import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RegisterDriverCommand } from './register-driver.command.js';
import { DRIVER_SERVICE, type IDriverService } from '../../services/interfaces/driver.service.interface.js';
import type { DriverResponseDTO } from '../../dtos/responses/driver/driver-response.dto.js';

@CommandHandler(RegisterDriverCommand)
export class RegisterDriverHandler implements ICommandHandler<RegisterDriverCommand, DriverResponseDTO> {
  constructor(@Inject(DRIVER_SERVICE) private readonly service: IDriverService) {}
  async execute(c: RegisterDriverCommand): Promise<DriverResponseDTO> { return this.service.register(c.dto, c.actorId); }
}
