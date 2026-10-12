import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MarkReturnLostCommand } from './mark-return-lost.command.js';
import { RETURN_SHIPMENT_SERVICE, type IReturnShipmentService } from '../../services/interfaces/return-shipment.service.interface.js';
import type { ReturnShipmentResponseDTO } from '../../dtos/responses/return-shipment/return-shipment-response.dto.js';

@CommandHandler(MarkReturnLostCommand)
export class MarkReturnLostHandler implements ICommandHandler<MarkReturnLostCommand, ReturnShipmentResponseDTO> {
  constructor(@Inject(RETURN_SHIPMENT_SERVICE) private readonly service: IReturnShipmentService) {}
  async execute(c: MarkReturnLostCommand): Promise<ReturnShipmentResponseDTO> { return this.service.markLost(c.dto, c.actorId); }
}
