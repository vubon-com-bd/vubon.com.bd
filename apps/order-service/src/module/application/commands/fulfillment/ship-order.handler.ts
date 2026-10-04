import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ShipOrderCommand } from './ship-order.command.js';
import { ORDER_FULFILLMENT_SERVICE, type IOrderFulfillmentService } from '../../services/interfaces/order-fulfillment.service.interface.js';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment-response.dto.js';

@CommandHandler(ShipOrderCommand)
export class ShipOrderHandler implements ICommandHandler<ShipOrderCommand, FulfillmentResponseDTO> {
  constructor(@Inject(ORDER_FULFILLMENT_SERVICE) private readonly service: IOrderFulfillmentService) {}
  async execute(c: ShipOrderCommand): Promise<FulfillmentResponseDTO> {
    return this.service.ship(c.dto, c.actorId);
  }
}
