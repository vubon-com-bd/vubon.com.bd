import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { DeactivateCourierCommand } from './deactivate-courier.command.js';
import { COURIER_SERVICE, type ICourierService } from '@application/services/interfaces/courier.service.interface';
import type { CourierResponseDTO } from '@application/dtos/responses/courier/index.js';

@CommandHandler(DeactivateCourierCommand)
export class DeactivateCourierHandler implements ICommandHandler<DeactivateCourierCommand, CourierResponseDTO> {
  constructor(@Inject(COURIER_SERVICE) private readonly service: ICourierService) {}
  async execute(c: DeactivateCourierCommand): Promise<CourierResponseDTO> {
    return this.service.deactivate(c.dto, c.actorId);
  }
}
