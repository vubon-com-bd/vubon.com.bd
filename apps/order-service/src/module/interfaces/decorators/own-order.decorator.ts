/**
 * @OwnOrder() — marks route requiring ownership check
 * @module order-service/interfaces/decorators
 */
import { SetMetadata } from '@nestjs/common';

export const OWN_ORDER_META_KEY = 'order_own_check';

export const OwnOrder = (): MethodDecorator & ClassDecorator =>
  SetMetadata(OWN_ORDER_META_KEY, true);
