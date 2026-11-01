import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PutOnHoldFulfillmentCommand } from './put-on-hold.command.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '@application/services/interfaces/fulfillment.service.interface';
import type { FulfillmentResponseDTO } from '@application/dtos/responses/fulfillment/index.js';

@CommandHandler(PutOnHoldFulfillmentCommand)
export class PutOnHoldFulfillmentHandler implements ICommandHandler<PutOnHoldFulfillmentCommand, FulfillmentResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(c: PutOnHoldFulfillmentCommand): Promise<FulfillmentResponseDTO> {
    return this.service.putOnHold(c.dto, c.actorId);
  }
}
