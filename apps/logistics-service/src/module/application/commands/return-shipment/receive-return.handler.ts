import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ReceiveReturnCommand } from './receive-return.command.js';
import { RETURN_SHIPMENT_SERVICE, type IReturnShipmentService } from '../../services/interfaces/return-shipment.service.interface.js';
import type { ReturnShipmentResponseDTO } from '../../dtos/responses/return-shipment/return-shipment-response.dto.js';

@CommandHandler(ReceiveReturnCommand)
export class ReceiveReturnHandler implements ICommandHandler<ReceiveReturnCommand, ReturnShipmentResponseDTO> {
  constructor(@Inject(RETURN_SHIPMENT_SERVICE) private readonly service: IReturnShipmentService) {}
  async execute(c: ReceiveReturnCommand): Promise<ReturnShipmentResponseDTO> { return this.service.receive(c.dto, c.actorId); }
}
