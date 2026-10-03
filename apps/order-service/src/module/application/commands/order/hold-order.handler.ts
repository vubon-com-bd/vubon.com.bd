import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { HoldOrderCommand } from './hold-order.command.js';
import { ORDER_SERVICE, type IOrderService } from '../../services/interfaces/order.service.interface.js';
import type { OrderResponseDTO } from '../../dtos/responses/order-response.dto.js';

@CommandHandler(HoldOrderCommand)
export class HoldOrderHandler implements ICommandHandler<HoldOrderCommand, OrderResponseDTO> {
  constructor(@Inject(ORDER_SERVICE) private readonly service: IOrderService) {}
  async execute(c: HoldOrderCommand): Promise<OrderResponseDTO> {
    return this.service.hold(c.dto, c.actorId);
  }
}
