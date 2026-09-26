import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import type { OrderRepository } from '../../domain/repositories/order.repository.interface';
import { OrderIdVO } from '../../domain/value-objects/primitives/order-id.vo';

@Injectable()
export class OwnOrderGuard implements CanActivate {
  constructor(private readonly orderRepo: OrderRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{
      user?: { userId?: string };
      params: { id?: string };
    }>();

    const currentUserId = request.user?.userId;
    const orderId = request.params.id;

    if (!currentUserId || !orderId) {
      throw new ForbiddenException('Cannot determine order ownership');
    }

    const order = await this.orderRepo.findById(OrderIdVO.create(orderId));
    if (!order) {
      throw new ForbiddenException('Order not found');
    }

    if (order.customerId.value !== currentUserId) {
      throw new ForbiddenException('You can only access your own order');
    }
    return true;
  }
}
