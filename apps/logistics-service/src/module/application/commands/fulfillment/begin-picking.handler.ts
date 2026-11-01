import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BeginPickingFulfillmentCommand } from './begin-picking.command.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '@application/services/interfaces/fulfillment.service.interface';
import type { FulfillmentResponseDTO } from '@application/dtos/responses/fulfillment/index.js';

@CommandHandler(BeginPickingFulfillmentCommand)
export class BeginPickingFulfillmentHandler implements ICommandHandler<BeginPickingFulfillmentCommand, FulfillmentResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(c: BeginPickingFulfillmentCommand): Promise<FulfillmentResponseDTO> {
    return this.service.beginPicking(c.dto, c.actorId);
  }
}
