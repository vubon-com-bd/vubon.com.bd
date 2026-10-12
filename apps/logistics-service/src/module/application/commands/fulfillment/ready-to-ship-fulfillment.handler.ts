import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ReadyToShipFulfillmentCommand } from './ready-to-ship-fulfillment.command.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '../../services/interfaces/fulfillment.service.interface.js';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment/fulfillment-response.dto.js';

@CommandHandler(ReadyToShipFulfillmentCommand)
export class ReadyToShipFulfillmentHandler implements ICommandHandler<ReadyToShipFulfillmentCommand, FulfillmentResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(c: ReadyToShipFulfillmentCommand): Promise<FulfillmentResponseDTO> { return this.service.readyToShip(c.dto, c.actorId); }
}
