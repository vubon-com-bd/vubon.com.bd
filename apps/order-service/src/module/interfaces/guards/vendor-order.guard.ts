/**
 * VendorOrderGuard — verifies caller (vendor) is part of the order
 * @module order-service/interfaces/guards
 */
import {
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';
import { HTTP_STATUS } from '@vubon/shared-constants/common';
import {
  ORDER_REPOSITORY,
  type OrderRepository,
} from '../../domain/repositories/order.repository.interface.js';

@Injectable()
export class VendorOrderGuard extends BaseGuard {
  constructor(
    @Inject(ORDER_REPOSITORY) private readonly orderRepo: OrderRepository,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<{
      params?: Record<string, string>;
      user?: { userId?: string; role?: string; vendorId?: string };
    }>();

    const orderId = req.params?.orderId ?? req.params?.id;
    if (!orderId) return true;

    const user = req.user;
    if (!user?.userId) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Authentication required',
      });
    }

    if (user.role === 'admin' || user.role === 'super_admin') return true;

    if (
      user.role !== 'vendor' &&
      user.role !== 'vendor_manager' &&
      user.role !== 'vendor_staff'
    ) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Vendor role required',
      });
    }

    if (!user.vendorId) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'No vendor associated with user',
      });
    }

    const order = await this.orderRepo.findById(orderId);
    if (!order) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Order not found',
      });
    }

    const isVendorInOrder = order.vendorIds.some(
      (v) => v.value === user.vendorId,
    );

    if (!isVendorInOrder) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Order does not belong to your vendor',
      });
    }

    return true;
  }
}
