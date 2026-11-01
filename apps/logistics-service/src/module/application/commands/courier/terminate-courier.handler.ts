import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { TerminateCourierCommand } from './terminate-courier.command.js';
import { COURIER_SERVICE, type ICourierService } from '@application/services/interfaces/courier.service.interface';
import type { CourierResponseDTO } from '@application/dtos/responses/courier/index.js';

@CommandHandler(TerminateCourierCommand)
export class TerminateCourierHandler implements ICommandHandler<TerminateCourierCommand, CourierResponseDTO> {
  constructor(@Inject(COURIER_SERVICE) private readonly service: ICourierService) {}
  async execute(c: TerminateCourierCommand): Promise<CourierResponseDTO> {
    return this.service.terminate(c.dto, c.actorId);
  }
}
