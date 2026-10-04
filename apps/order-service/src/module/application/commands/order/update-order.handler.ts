import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { UpdateOrderCommand } from './update-order.command.js';
import { ORDER_SERVICE, type IOrderService } from '../../services/interfaces/order.service.interface.js';
import type { OrderResponseDTO } from '../../dtos/responses/order-response.dto.js';

@CommandHandler(UpdateOrderCommand)
export class UpdateOrderHandler implements ICommandHandler<UpdateOrderCommand, OrderResponseDTO> {
  constructor(@Inject(ORDER_SERVICE) private readonly service: IOrderService) {}
  async execute(c: UpdateOrderCommand): Promise<OrderResponseDTO> {
    return this.service.update(c.dto, c.actorId);
  }
}
