import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MarkReadyToShipFulfillmentCommand } from './mark-ready-to-ship.command.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '@application/services/interfaces/fulfillment.service.interface';
import type { FulfillmentResponseDTO } from '@application/dtos/responses/fulfillment/index.js';

@CommandHandler(MarkReadyToShipFulfillmentCommand)
export class MarkReadyToShipFulfillmentHandler implements ICommandHandler<MarkReadyToShipFulfillmentCommand, FulfillmentResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(c: MarkReadyToShipFulfillmentCommand): Promise<FulfillmentResponseDTO> {
    return this.service.markReadyToShip(c.dto, c.actorId);
  }
}
