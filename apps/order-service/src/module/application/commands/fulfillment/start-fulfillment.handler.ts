import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { StartFulfillmentCommand } from './start-fulfillment.command.js';
import { ORDER_FULFILLMENT_SERVICE, type IOrderFulfillmentService } from '../../services/interfaces/order-fulfillment.service.interface.js';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment-response.dto.js';

@CommandHandler(StartFulfillmentCommand)
export class StartFulfillmentHandler implements ICommandHandler<StartFulfillmentCommand, FulfillmentResponseDTO> {
  constructor(@Inject(ORDER_FULFILLMENT_SERVICE) private readonly service: IOrderFulfillmentService) {}
  async execute(c: StartFulfillmentCommand): Promise<FulfillmentResponseDTO> {
    return this.service.start(c.dto, c.actorId);
  }
}
