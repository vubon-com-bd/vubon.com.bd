import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import type { OrderRepository } from '../../domain/repositories/order.repository.interface';
import { OrderIdVO } from '../../domain/value-objects/primitives/order-id.vo';

@Injectable()
export class VendorOrderGuard implements CanActivate {
  constructor(private readonly orderRepo: OrderRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{
      user?: { vendorId?: string };
      params: { id?: string };
    }>();

    const vendorId = request.user?.vendorId;
    const orderId = request.params.id;

    if (!vendorId || !orderId) {
      throw new ForbiddenException('Cannot determine vendor ownership');
    }

    const order = await this.orderRepo.findById(OrderIdVO.create(orderId));
    if (!order) {
      throw new ForbiddenException('Order not found');
    }

    if (order.vendorId?.value !== vendorId) {
      throw new ForbiddenException('You can only access your own vendor orders');
    }
    return true;
  }
}
