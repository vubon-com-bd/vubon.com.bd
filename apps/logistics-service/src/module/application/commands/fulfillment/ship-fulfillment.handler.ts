import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ShipFulfillmentCommand } from './ship-fulfillment.command.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '../../services/interfaces/fulfillment.service.interface.js';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment/fulfillment-response.dto.js';

@CommandHandler(ShipFulfillmentCommand)
export class ShipFulfillmentHandler implements ICommandHandler<ShipFulfillmentCommand, FulfillmentResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(c: ShipFulfillmentCommand): Promise<FulfillmentResponseDTO> { return this.service.ship(c.dto, c.actorId); }
}
