import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ShipFulfillmentCommand } from './ship.command.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '@application/services/interfaces/fulfillment.service.interface';
import type { FulfillmentResponseDTO } from '@application/dtos/responses/fulfillment/index.js';

@CommandHandler(ShipFulfillmentCommand)
export class ShipFulfillmentHandler implements ICommandHandler<ShipFulfillmentCommand, FulfillmentResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(c: ShipFulfillmentCommand): Promise<FulfillmentResponseDTO> {
    return this.service.ship(c.dto, c.actorId);
  }
}
