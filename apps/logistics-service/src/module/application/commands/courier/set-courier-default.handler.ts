import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SetCourierDefaultCommand } from './set-courier-default.command.js';
import { COURIER_SERVICE, type ICourierService } from '../../services/interfaces/courier.service.interface.js';
import type { CourierResponseDTO } from '../../dtos/responses/courier/courier-response.dto.js';

@CommandHandler(SetCourierDefaultCommand)
export class SetCourierDefaultHandler implements ICommandHandler<SetCourierDefaultCommand, CourierResponseDTO> {
  constructor(@Inject(COURIER_SERVICE) private readonly service: ICourierService) {}
  async execute(c: SetCourierDefaultCommand): Promise<CourierResponseDTO> { return this.service.setDefault(c.dto, c.actorId); }
}
