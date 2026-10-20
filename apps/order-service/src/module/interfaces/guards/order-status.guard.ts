/**
 * OrderStatusGuard — restricts by order status
 * @module order-service/interfaces/guards
 */
import {
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import {
  ORDER_REPOSITORY,
  type OrderRepository,
} from '../../domain/repositories/order.repository.interface.js';

export const ORDER_STATUS_META_KEY = 'order_status_allowed';

@Injectable()
export class OrderStatusGuard extends BaseGuard {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly repo: OrderRepository,
    private readonly reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const allowed = this.reflector.getAllAndOverride<readonly string[]>(
      ORDER_STATUS_META_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!allowed || allowed.length === 0) return true;

    const req = context.switchToHttp().getRequest<{
      params?: Record<string, string>;
    }>();
    const orderId = req.params?.['orderId'] ?? req.params?.['id'];
    if (!orderId) return true;

    const order = await this.repo.findById(orderId);
    if (!order) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Order not found',
      });
    }

    if (!allowed.includes(order.status.value)) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: `Order status "${order.status.value}" not allowed (requires: ${allowed.join(', ')})`,
      });
    }

    return true;
  }
}
