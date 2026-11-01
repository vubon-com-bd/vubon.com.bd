import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CancelFulfillmentCommand } from './cancel.command.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '@application/services/interfaces/fulfillment.service.interface';
import type { FulfillmentResponseDTO } from '@application/dtos/responses/fulfillment/index.js';

@CommandHandler(CancelFulfillmentCommand)
export class CancelFulfillmentHandler implements ICommandHandler<CancelFulfillmentCommand, FulfillmentResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(c: CancelFulfillmentCommand): Promise<FulfillmentResponseDTO> {
    return this.service.cancel(c.dto, c.actorId);
  }
}
