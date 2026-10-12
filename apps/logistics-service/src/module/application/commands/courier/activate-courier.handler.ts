import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ActivateCourierCommand } from './activate-courier.command.js';
import { COURIER_SERVICE, type ICourierService } from '../../services/interfaces/courier.service.interface.js';
import type { CourierResponseDTO } from '../../dtos/responses/courier/courier-response.dto.js';

@CommandHandler(ActivateCourierCommand)
export class ActivateCourierHandler implements ICommandHandler<ActivateCourierCommand, CourierResponseDTO> {
  constructor(@Inject(COURIER_SERVICE) private readonly service: ICourierService) {}
  async execute(c: ActivateCourierCommand): Promise<CourierResponseDTO> { return this.service.activate(c.dto, c.actorId); }
}
