import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ScheduleReturnPickupCommand } from './schedule-return-pickup.command.js';
import { RETURN_SHIPMENT_SERVICE, type IReturnShipmentService } from '../../services/interfaces/return-shipment.service.interface.js';
import type { ReturnShipmentResponseDTO } from '../../dtos/responses/return-shipment/return-shipment-response.dto.js';

@CommandHandler(ScheduleReturnPickupCommand)
export class ScheduleReturnPickupHandler implements ICommandHandler<ScheduleReturnPickupCommand, ReturnShipmentResponseDTO> {
  constructor(@Inject(RETURN_SHIPMENT_SERVICE) private readonly service: IReturnShipmentService) {}
  async execute(c: ScheduleReturnPickupCommand): Promise<ReturnShipmentResponseDTO> { return this.service.schedulePickup(c.dto, c.actorId); }
}
