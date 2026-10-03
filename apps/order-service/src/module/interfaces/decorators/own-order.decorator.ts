/**
 * @OwnOrder() — marks a route handler that requires caller to own the order
 * @module order-service/interfaces/decorators
 *
 * Consumed by OwnOrderGuard (metadata only, no logic).
 */
import { SetMetadata } from '@nestjs/common';

export const OWN_ORDER_METADATA_KEY = 'ownOrder';

export const OwnOrder = (): MethodDecorator & ClassDecorator =>
  SetMetadata(OWN_ORDER_METADATA_KEY, true);
