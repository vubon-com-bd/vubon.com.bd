/**
 * OrderStatusGuard — checks order's current status against
 * metadata set by @OrderStatus() decorator
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
import { ORDER_STATUS_METADATA_KEY } from '../decorators/order-status.decorator.js';

@Injectable()
export class OrderStatusGuard extends BaseGuard {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepo: OrderRepository,
    private readonly reflector: Reflector,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const allowedStatuses = this.reflector.getAllAndOverride<
      readonly string[] | undefined
    >(ORDER_STATUS_METADATA_KEY, [context.getHandler(), context.getClass()]);

    if (!allowedStatuses || allowedStatuses.length === 0) return true;

    const req = context.switchToHttp().getRequest<{
      params?: Record<string, string>;
    }>();

    const orderId = req.params?.orderId ?? req.params?.id;
    if (!orderId) return true;

    const order = await this.orderRepo.findById(orderId);
    if (!order) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Order not found',
      });
    }

    if (!allowedStatuses.includes(order.status.value)) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: `Order status "${order.status.value}" is not allowed for this action. Allowed: ${allowedStatuses.join(', ')}`,
      });
    }

    return true;
  }
}
