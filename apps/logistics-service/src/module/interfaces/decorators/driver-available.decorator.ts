import { SetMetadata } from '@nestjs/common';

export const DRIVER_AVAILABLE_KEY = 'driverAvailable';
export const RequireDriverAvailable = (): MethodDecorator =>
  SetMetadata(DRIVER_AVAILABLE_KEY, true);
