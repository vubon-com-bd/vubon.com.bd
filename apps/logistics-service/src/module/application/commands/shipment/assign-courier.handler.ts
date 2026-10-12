import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { AssignCourierCommand } from './assign-courier.command.js';
import { SHIPMENT_SERVICE, type IShipmentService } from '../../services/interfaces/shipment.service.interface.js';
import type { ShipmentResponseDTO } from '../../dtos/responses/shipment/shipment-response.dto.js';

@CommandHandler(AssignCourierCommand)
export class AssignCourierHandler implements ICommandHandler<AssignCourierCommand, ShipmentResponseDTO> {
  constructor(@Inject(SHIPMENT_SERVICE) private readonly service: IShipmentService) {}
  async execute(c: AssignCourierCommand): Promise<ShipmentResponseDTO> {
    return this.service.assignCourier(c.dto, c.actorId);
  }
}
