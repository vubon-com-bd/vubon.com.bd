import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SuspendCourierCommand } from './suspend-courier.command.js';
import { COURIER_SERVICE, type ICourierService } from '@application/services/interfaces/courier.service.interface';
import type { CourierResponseDTO } from '@application/dtos/responses/courier/index.js';

@CommandHandler(SuspendCourierCommand)
export class SuspendCourierHandler implements ICommandHandler<SuspendCourierCommand, CourierResponseDTO> {
  constructor(@Inject(COURIER_SERVICE) private readonly service: ICourierService) {}
  async execute(c: SuspendCourierCommand): Promise<CourierResponseDTO> {
    return this.service.suspend(c.dto, c.actorId);
  }
}
