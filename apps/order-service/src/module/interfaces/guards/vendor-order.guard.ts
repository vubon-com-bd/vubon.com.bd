/**
 * VendorOrderGuard — vendor access check
 * @module order-service/interfaces/guards
 */
import {
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { BaseGuard } from '@vubon/shared-kernel/interfaces/guards';
import { HTTP_STATUS, ROLE } from '@vubon/shared-constants/common';
import {
  ORDER_REPOSITORY,
  type OrderRepository,
} from '../../domain/repositories/order.repository.interface.js';

@Injectable()
export class VendorOrderGuard extends BaseGuard {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly repo: OrderRepository,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<{
      params?: Record<string, string>;
      user?: { userId?: string; roles?: readonly string[] };
    }>();

    const orderId = req.params?.['orderId'] ?? req.params?.['id'];
    if (!orderId) return true;

    const user = req.user;
    if (!user?.userId) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Authentication required',
      });
    }

    const isAdmin =
      user.roles?.includes(ROLE.ADMIN) ||
      user.roles?.includes(ROLE.SUPER_ADMIN);
    if (isAdmin) return true;

    const isVendor =
      user.roles?.includes(ROLE.VENDOR) ||
      user.roles?.includes(ROLE.VENDOR_MANAGER) ||
      user.roles?.includes(ROLE.VENDOR_STAFF);

    if (!isVendor) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Vendor access required',
      });
    }

    const order = await this.repo.findById(orderId);
    if (!order) {
      throw new ForbiddenException({
        statusCode: HTTP_STATUS.FORBIDDEN,
        message: 'Order not found',
      });
    }

    return true;
  }
}
