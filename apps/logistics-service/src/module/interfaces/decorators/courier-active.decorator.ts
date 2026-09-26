import { SetMetadata } from '@nestjs/common';

export const COURIER_ACTIVE_KEY = 'courierActive';
export const RequireCourierActive = (): MethodDecorator =>
  SetMetadata(COURIER_ACTIVE_KEY, true);
