import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateCourierCommand } from './create-courier.command.js';
import { COURIER_SERVICE, type ICourierService } from '@application/services/interfaces/courier.service.interface';
import type { CourierResponseDTO } from '@application/dtos/responses/courier/index.js';

@CommandHandler(CreateCourierCommand)
export class CreateCourierHandler implements ICommandHandler<CreateCourierCommand, CourierResponseDTO> {
  constructor(@Inject(COURIER_SERVICE) private readonly service: ICourierService) {}
  async execute(c: CreateCourierCommand): Promise<CourierResponseDTO> {
    return this.service.create(c.dto, c.actorId);
  }
}
