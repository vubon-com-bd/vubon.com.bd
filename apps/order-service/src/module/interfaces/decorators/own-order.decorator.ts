import { SetMetadata } from '@nestjs/common';

export const REQUIRE_OWN_ORDER_KEY = 'require_own_order';
export const RequireOwnOrder = (): MethodDecorator & ClassDecorator =>
  SetMetadata(REQUIRE_OWN_ORDER_KEY, true);
