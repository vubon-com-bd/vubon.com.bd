import { SetMetadata } from '@nestjs/common';
import { ORDER_STATUS_KEY } from '../guards/order-status.guard';

export const RequireOrderStatus = (
  ...statuses: readonly string[]
): MethodDecorator & ClassDecorator =>
  SetMetadata(ORDER_STATUS_KEY, statuses);
