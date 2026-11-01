import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PartiallyFulfillFulfillmentCommand } from './partially-fulfill.command.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '@application/services/interfaces/fulfillment.service.interface';
import type { FulfillmentResponseDTO } from '@application/dtos/responses/fulfillment/index.js';

@CommandHandler(PartiallyFulfillFulfillmentCommand)
export class PartiallyFulfillFulfillmentHandler implements ICommandHandler<PartiallyFulfillFulfillmentCommand, FulfillmentResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(c: PartiallyFulfillFulfillmentCommand): Promise<FulfillmentResponseDTO> {
    return this.service.partiallyFulfill(c.dto, c.actorId);
  }
}
