import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CompleteFulfillmentCommand } from './complete-fulfillment.command.js';
import { ORDER_FULFILLMENT_SERVICE, type IOrderFulfillmentService } from '../../services/interfaces/order-fulfillment.service.interface.js';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment-response.dto.js';

@CommandHandler(CompleteFulfillmentCommand)
export class CompleteFulfillmentHandler implements ICommandHandler<CompleteFulfillmentCommand, FulfillmentResponseDTO> {
  constructor(@Inject(ORDER_FULFILLMENT_SERVICE) private readonly service: IOrderFulfillmentService) {}
  async execute(c: CompleteFulfillmentCommand): Promise<FulfillmentResponseDTO> {
    return this.service.complete(c.dto, c.actorId);
  }
}
