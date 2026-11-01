import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateReturnShipmentCommand } from './create-return-shipment.command.js';
import { RETURN_SHIPMENT_SERVICE, type IReturnShipmentService } from '@application/services/interfaces/return-shipment.service.interface';
import type { ReturnShipmentResponseDTO } from '@application/dtos/responses/return-shipment/index.js';

@CommandHandler(CreateReturnShipmentCommand)
export class CreateReturnShipmentHandler implements ICommandHandler<CreateReturnShipmentCommand, ReturnShipmentResponseDTO> {
  constructor(@Inject(RETURN_SHIPMENT_SERVICE) private readonly service: IReturnShipmentService) {}
  async execute(c: CreateReturnShipmentCommand): Promise<ReturnShipmentResponseDTO> { return this.service.create(c.dto, c.actorId); }
}
