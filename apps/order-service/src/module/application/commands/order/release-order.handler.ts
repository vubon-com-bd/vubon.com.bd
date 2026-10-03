import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';
import { ReleaseOrderCommand } from './release-order.command.js';
import { ORDER_SERVICE, type IOrderService } from '../../services/interfaces/order.service.interface.js';
import type { OrderResponseDTO } from '../../dtos/responses/order-response.dto.js';

@CommandHandler(ReleaseOrderCommand)
export class ReleaseOrderHandler implements ICommandHandler<ReleaseOrderCommand, OrderResponseDTO> {
  constructor(@Inject(ORDER_SERVICE) private readonly service: IOrderService) {}
  async execute(c: ReleaseOrderCommand): Promise<OrderResponseDTO> {
    return this.service.release(c.dto, c.actorId);
  }
}
