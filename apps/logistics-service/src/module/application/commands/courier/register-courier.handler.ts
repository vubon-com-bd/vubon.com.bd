import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { RegisterCourierCommand } from './register-courier.command.js';
import { COURIER_SERVICE, type ICourierService } from '../../services/interfaces/courier.service.interface.js';
import type { CourierResponseDTO } from '../../dtos/responses/courier/courier-response.dto.js';

@CommandHandler(RegisterCourierCommand)
export class RegisterCourierHandler implements ICommandHandler<RegisterCourierCommand, CourierResponseDTO> {
  constructor(@Inject(COURIER_SERVICE) private readonly service: ICourierService) {}
  async execute(c: RegisterCourierCommand): Promise<CourierResponseDTO> { return this.service.register(c.dto, c.actorId); }
}
