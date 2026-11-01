import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { BeginPackingFulfillmentCommand } from './begin-packing.command.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '@application/services/interfaces/fulfillment.service.interface';
import type { FulfillmentResponseDTO } from '@application/dtos/responses/fulfillment/index.js';

@CommandHandler(BeginPackingFulfillmentCommand)
export class BeginPackingFulfillmentHandler implements ICommandHandler<BeginPackingFulfillmentCommand, FulfillmentResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(c: BeginPackingFulfillmentCommand): Promise<FulfillmentResponseDTO> {
    return this.service.beginPacking(c.dto, c.actorId);
  }
}
