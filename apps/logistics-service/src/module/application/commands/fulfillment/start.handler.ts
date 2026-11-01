import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { StartFulfillmentCommand } from './start.command.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '@application/services/interfaces/fulfillment.service.interface';
import type { FulfillmentResponseDTO } from '@application/dtos/responses/fulfillment/index.js';

@CommandHandler(StartFulfillmentCommand)
export class StartFulfillmentHandler implements ICommandHandler<StartFulfillmentCommand, FulfillmentResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(c: StartFulfillmentCommand): Promise<FulfillmentResponseDTO> {
    return this.service.start(c.dto, c.actorId);
  }
}
