import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { FulfillFulfillmentCommand } from './fulfill.command.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '@application/services/interfaces/fulfillment.service.interface';
import type { FulfillmentResponseDTO } from '@application/dtos/responses/fulfillment/index.js';

@CommandHandler(FulfillFulfillmentCommand)
export class FulfillFulfillmentHandler implements ICommandHandler<FulfillFulfillmentCommand, FulfillmentResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(c: FulfillFulfillmentCommand): Promise<FulfillmentResponseDTO> {
    return this.service.fulfill(c.dto, c.actorId);
  }
}
