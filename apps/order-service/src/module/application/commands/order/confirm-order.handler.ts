import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ConfirmOrderCommand } from './confirm-order.command.js';
import { ORDER_SERVICE, type IOrderService } from '../../services/interfaces/order.service.interface.js';
import type { OrderResponseDTO } from '../../dtos/responses/order-response.dto.js';

@CommandHandler(ConfirmOrderCommand)
export class ConfirmOrderHandler implements ICommandHandler<ConfirmOrderCommand, OrderResponseDTO> {
  constructor(@Inject(ORDER_SERVICE) private readonly service: IOrderService) {}
  async execute(c: ConfirmOrderCommand): Promise<OrderResponseDTO> {
    return this.service.confirm(c.dto, c.actorId);
  }
}
