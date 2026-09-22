import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { OrderRepository } from '../../domain/repositories/order.repository.interface';
import { OrderIdVO } from '../../domain/value-objects/primitives/order-id.vo';

export const ORDER_STATUS_KEY = 'order_status';

@Injectable()
export class OrderStatusGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly orderRepo: OrderRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredStatuses = this.reflector.getAllAndOverride<
      readonly string[]
    >(ORDER_STATUS_KEY, [context.getHandler(), context.getClass()]);

    if (!requiredStatuses || requiredStatuses.length === 0) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<{ params: { id?: string } }>();
    const orderId = request.params.id;

    if (!orderId) {
      throw new ForbiddenException('Order ID missing');
    }

    const order = await this.orderRepo.findById(OrderIdVO.create(orderId));
    if (!order) {
      throw new ForbiddenException('Order not found');
    }

    if (!requiredStatuses.includes(order.status.value)) {
      throw new ForbiddenException(
        `Order status must be one of: ${requiredStatuses.join(', ')}`,
      );
    }
    return true;
  }
}
