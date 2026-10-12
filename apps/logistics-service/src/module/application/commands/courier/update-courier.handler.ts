import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateCourierCommand } from './update-courier.command.js';
import { COURIER_SERVICE, type ICourierService } from '../../services/interfaces/courier.service.interface.js';
import type { CourierResponseDTO } from '../../dtos/responses/courier/courier-response.dto.js';

@CommandHandler(UpdateCourierCommand)
export class UpdateCourierHandler implements ICommandHandler<UpdateCourierCommand, CourierResponseDTO> {
  constructor(@Inject(COURIER_SERVICE) private readonly service: ICourierService) {}
  async execute(c: UpdateCourierCommand): Promise<CourierResponseDTO> { return this.service.update(c.dto, c.actorId); }
}
