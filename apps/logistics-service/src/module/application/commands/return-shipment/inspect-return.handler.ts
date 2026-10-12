import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { InspectReturnCommand } from './inspect-return.command.js';
import { RETURN_SHIPMENT_SERVICE, type IReturnShipmentService } from '../../services/interfaces/return-shipment.service.interface.js';
import type { ReturnShipmentResponseDTO } from '../../dtos/responses/return-shipment/return-shipment-response.dto.js';

@CommandHandler(InspectReturnCommand)
export class InspectReturnHandler implements ICommandHandler<InspectReturnCommand, ReturnShipmentResponseDTO> {
  constructor(@Inject(RETURN_SHIPMENT_SERVICE) private readonly service: IReturnShipmentService) {}
  async execute(c: InspectReturnCommand): Promise<ReturnShipmentResponseDTO> { return this.service.inspect(c.dto, c.actorId); }
}
