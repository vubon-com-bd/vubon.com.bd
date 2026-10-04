/**
 * @OrderStatus(...statuses) — restrict route to specific order statuses
 * @module order-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';
import type { OrderStatusValue } from '@vubon/shared-types/business/order';

export const ORDER_STATUS_METADATA_KEY = 'orderStatus';

export const OrderStatus = (
  ...statuses: readonly (OrderStatusValue | string)[]
): MethodDecorator & ClassDecorator =>
  SetMetadata(ORDER_STATUS_METADATA_KEY, statuses);
