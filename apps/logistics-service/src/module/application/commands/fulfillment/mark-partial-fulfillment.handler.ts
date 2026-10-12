import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { MarkPartialFulfillmentCommand } from './mark-partial-fulfillment.command.js';
import { FULFILLMENT_SERVICE, type IFulfillmentService } from '../../services/interfaces/fulfillment.service.interface.js';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment/fulfillment-response.dto.js';

@CommandHandler(MarkPartialFulfillmentCommand)
export class MarkPartialFulfillmentHandler implements ICommandHandler<MarkPartialFulfillmentCommand, FulfillmentResponseDTO> {
  constructor(@Inject(FULFILLMENT_SERVICE) private readonly service: IFulfillmentService) {}
  async execute(c: MarkPartialFulfillmentCommand): Promise<FulfillmentResponseDTO> { return this.service.markPartiallyFulfilled(c.dto, c.actorId); }
}
