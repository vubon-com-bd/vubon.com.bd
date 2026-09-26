import { SetMetadata } from '@nestjs/common';

export const VEHICLE_AVAILABLE_KEY = 'vehicleAvailable';
export const RequireVehicleAvailable = (): MethodDecorator =>
  SetMetadata(VEHICLE_AVAILABLE_KEY, true);
