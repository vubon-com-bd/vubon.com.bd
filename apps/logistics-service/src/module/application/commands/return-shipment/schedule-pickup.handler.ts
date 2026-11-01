import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { SchedulePickupReturnShipmentCommand } from './schedule-pickup.command.js';
import { RETURN_SHIPMENT_SERVICE, type IReturnShipmentService } from '@application/services/interfaces/return-shipment.service.interface';
import type { ReturnShipmentResponseDTO } from '@application/dtos/responses/return-shipment/index.js';

@CommandHandler(SchedulePickupReturnShipmentCommand)
export class SchedulePickupReturnShipmentHandler implements ICommandHandler<SchedulePickupReturnShipmentCommand, ReturnShipmentResponseDTO> {
  constructor(@Inject(RETURN_SHIPMENT_SERVICE) private readonly service: IReturnShipmentService) {}
  async execute(c: SchedulePickupReturnShipmentCommand): Promise<ReturnShipmentResponseDTO> { return this.service.schedulePickup(c.dto, c.actorId); }
}
