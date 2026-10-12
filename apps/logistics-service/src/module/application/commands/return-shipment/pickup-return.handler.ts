import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PickupReturnCommand } from './pickup-return.command.js';
import { RETURN_SHIPMENT_SERVICE, type IReturnShipmentService } from '../../services/interfaces/return-shipment.service.interface.js';
import type { ReturnShipmentResponseDTO } from '../../dtos/responses/return-shipment/return-shipment-response.dto.js';

@CommandHandler(PickupReturnCommand)
export class PickupReturnHandler implements ICommandHandler<PickupReturnCommand, ReturnShipmentResponseDTO> {
  constructor(@Inject(RETURN_SHIPMENT_SERVICE) private readonly service: IReturnShipmentService) {}
  async execute(c: PickupReturnCommand): Promise<ReturnShipmentResponseDTO> { return this.service.pickup(c.dto, c.actorId); }
}
