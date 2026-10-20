/**
 * @RequireOrderStatus() — restricts by order status
 * @module order-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';

export const ORDER_STATUS_REQUIRED_KEY = 'order_status_allowed';

export const RequireOrderStatus = (
  ...allowed: readonly string[]
): MethodDecorator & ClassDecorator =>
  SetMetadata(ORDER_STATUS_REQUIRED_KEY, allowed);
