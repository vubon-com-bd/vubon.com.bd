import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { FailFulfillmentCommand } from './fail.command.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '@application/services/interfaces/fulfillment.service.interface';
import type { FulfillmentResponseDTO } from '@application/dtos/responses/fulfillment/index.js';

@CommandHandler(FailFulfillmentCommand)
export class FailFulfillmentHandler implements ICommandHandler<FailFulfillmentCommand, FulfillmentResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(c: FailFulfillmentCommand): Promise<FulfillmentResponseDTO> {
    return this.service.fail(c.dto, c.actorId);
  }
}
