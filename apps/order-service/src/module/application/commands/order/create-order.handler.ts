import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { CreateOrderCommand } from './create-order.command.js';
import { ORDER_SERVICE, type IOrderService } from '../../services/interfaces/order.service.interface.js';
import type { OrderResponseDTO } from '../../dtos/responses/order-response.dto.js';

@CommandHandler(CreateOrderCommand)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCommand, OrderResponseDTO> {
  constructor(@Inject(ORDER_SERVICE) private readonly service: IOrderService) {}
  async execute(c: CreateOrderCommand): Promise<OrderResponseDTO> {
    return this.service.create(c.dto, c.actorId);
  }
}
