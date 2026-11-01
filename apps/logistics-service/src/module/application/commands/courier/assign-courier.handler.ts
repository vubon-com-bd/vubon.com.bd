import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AssignCourierToShipmentCommand } from './assign-courier.command.js';
import { COURIER_SERVICE, type ICourierService } from '@application/services/interfaces/courier.service.interface';
import type { CourierResponseDTO } from '@application/dtos/responses/courier/index.js';

@CommandHandler(AssignCourierToShipmentCommand)
export class AssignCourierToShipmentHandler implements ICommandHandler<AssignCourierToShipmentCommand, CourierResponseDTO> {
  constructor(@Inject(COURIER_SERVICE) private readonly service: ICourierService) {}
  async execute(c: AssignCourierToShipmentCommand): Promise<CourierResponseDTO> {
    return this.service.assignToShipment(c.dto, c.actorId);
  }
}
