import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { PackOrderCommand } from './pack-order.command.js';
import { ORDER_FULFILLMENT_SERVICE, type IOrderFulfillmentService } from '../../services/interfaces/order-fulfillment.service.interface.js';
import type { FulfillmentResponseDTO } from '../../dtos/responses/fulfillment-response.dto.js';

@CommandHandler(PackOrderCommand)
export class PackOrderHandler implements ICommandHandler<PackOrderCommand, FulfillmentResponseDTO> {
  constructor(@Inject(ORDER_FULFILLMENT_SERVICE) private readonly service: IOrderFulfillmentService) {}
  async execute(c: PackOrderCommand): Promise<FulfillmentResponseDTO> {
    return this.service.pack(c.dto, c.actorId);
  }
}
